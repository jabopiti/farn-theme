#!/usr/bin/env node
// Generates public/llms-full.txt — the full text of every docs page concatenated
// into one file, for AI agents/answer engines that want the whole corpus in a
// single fetch instead of crawling. Runs on every site build so it can't drift
// from the actual page content (unlike a hand-maintained file).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pagesDir = join(__dirname, '../src/pages');
const outFile = join(__dirname, '../public/llms-full.txt');
const siteUrl = 'https://farn.jbpt.de';

const ENTITIES = {
  '&lt;': '<', '&gt;': '>', '&amp;': '&', '&quot;': '"',
  '&#123;': '{', '&#125;': '}', '&hellip;': '…', '&nbsp;': ' ',
};

function walk(dir) {
  let files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files = files.concat(walk(full));
    else if (entry.name.endsWith('.astro')) files.push(full);
  }
  return files;
}

function urlFor(file) {
  const rel = relative(pagesDir, file).replace(/\\/g, '/');
  return '/' + rel.replace(/(?:index)?\.astro$/, '');
}

function extractMeta(source) {
  const title = source.match(/<DocLayout\s+title="([^"]+)"/)?.[1]
    ?? source.match(/const title\s*=\s*'([^']+)'/)?.[1]
    ?? null;
  const description = source.match(/description="([^"]+)"/)?.[1]
    ?? source.match(/const description\s*=\s*'([^']+)'/)?.[1]
    ?? null;
  return { title, description };
}

// Block-level HTML tags become line breaks; everything else (code, strong, a, span…)
// is stripped in place so inline-formatted sentences stay on one line. The page's
// layout wrapper (<DocLayout>, not an HTML tag) is stripped separately below —
// keeping it out of this list means adding a different layout later can't silently
// leave its wrapper tags unstripped.
const BLOCK_TAGS = 'p|div|section|article|h[1-6]|li|ul|ol|tr|td|th|table|pre|br|hr' +
  '|blockquote|header|footer|nav|main|figure|figcaption|dl|dt|dd';
const BLOCK_TAG_RE = new RegExp(`</?(?:${BLOCK_TAGS})(?:\\s[^>]*)?>`, 'gi');
const LAYOUT_WRAPPER_RE = /<\/?DocLayout(?:\s[^>]*)?>/gi;

// Apply a replacement repeatedly until it stops changing the string, so a single
// pass can't leave behind a fragment (e.g. from malformed/nested tags) that only
// forms a match once an earlier removal has run.
function replaceUntilStable(str, regex, replacement) {
  let prev;
  do {
    prev = str;
    str = str.replace(regex, replacement);
  } while (str !== prev);
  return str;
}

function stripElement(str, tagName) {
  return replaceUntilStable(str, new RegExp(`<${tagName}\\b[\\s\\S]*?<\\/${tagName}\\s*>`, 'gi'), '');
}

// Drop every top-level (and nested) {...} JS expression — dynamic demo blocks
// like `{[1, 2, 3].map(n => (<div>...</div>))}` aren't prose. Outside an `is:raw`
// block, a literal brace is never valid here: this codebase HTML-entity-escapes
// braces in code samples (`&#123;`/`&#125;`, see getting-started.astro)
// specifically so they don't get parsed as Astro expressions — so any raw `{`
// is guaranteed to open one, UNLESS it's inside `is:raw` (see extractText),
// Astro's other escape hatch, which turns off expression parsing entirely
// (used for unescaped code samples, e.g. templates/landing-page.astro).
function stripExpressions(str) {
  let out = '';
  let depth = 0;
  for (const ch of str) {
    if (ch === '{') depth++;
    else if (ch === '}') depth = Math.max(0, depth - 1);
    else if (depth === 0) out += ch;
  }
  return out;
}

// `<tag is:raw>...</tag>` content is opaque to Astro's compiler — braces inside
// are literal text, not expressions — so it must bypass stripExpressions entirely.
// Pull these blocks out before expression-stripping using a placeholder token
// that can't collide with real prose, then splice the extracted plain text back
// in once every other stripping pass (which would otherwise treat literal `<`/`>`
// inside the raw content as HTML tags) has finished running.
const RAW_BLOCK_RE = /<(\w+)(?:\s[^>]*)?\bis:raw\b[^>]*>[\s\S]*?<\/\1\s*>/gi;
const RAW_PLACEHOLDER_RE = /\[\[FARN_RAW_BLOCK_(\d+)\]\]/g;

function extractText(source) {
  let body = source.replace(/^---[\s\S]*?---/, ''); // frontmatter
  body = stripElement(body, 'script');
  body = stripElement(body, 'style');
  body = stripElement(body, 'svg');

  const rawBlocks = [];
  body = body.replace(RAW_BLOCK_RE, (match) => {
    rawBlocks.push(match.replace(/<[^>]+>/g, '\n'));
    return `[[FARN_RAW_BLOCK_${rawBlocks.length - 1}]]`;
  });

  body = stripExpressions(body);
  body = body.replace(LAYOUT_WRAPPER_RE, '\n');
  body = body.replace(BLOCK_TAG_RE, '\n');
  body = replaceUntilStable(body, /<[^>]*>/g, ''); // strip remaining inline tags, keep their text content
  body = body.replace(RAW_PLACEHOLDER_RE, (_, i) => rawBlocks[Number(i)]);
  body = body.replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m] ?? m);
  return body
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const sections = walk(pagesDir)
  .sort()
  .map((file) => {
    const source = readFileSync(file, 'utf8');
    const { title, description } = extractMeta(source);
    const text = extractText(source);
    if (!text) return null;
    const heading = `${title ?? urlFor(file)} — ${siteUrl}${urlFor(file)}`;
    return `## ${heading}\n${description ? description + '\n\n' : ''}${text}`;
  })
  .filter(Boolean);

const header = `# Farn — Full documentation text

> Concatenated full text of every page on ${siteUrl}, regenerated on every site
> build from the same source as the live site. For a shorter, curated reference
> optimised for coding agents, see /llms.txt.

`;

writeFileSync(outFile, header + sections.join('\n\n---\n\n') + '\n');
console.log(`[llms-full] wrote ${sections.length} pages to ${relative(process.cwd(), outFile)}`);
