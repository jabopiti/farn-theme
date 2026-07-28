#!/usr/bin/env node
// Generates public/llms-full.txt — the full text of every docs page concatenated
// into one file, for AI agents/answer engines that want the whole corpus in a
// single fetch instead of crawling. Runs on every site build so it can't drift
// from the actual page content (unlike a hand-maintained file).
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
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
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files = files.concat(walk(full));
    else if (entry.endsWith('.astro')) files.push(full);
  }
  return files;
}

function urlFor(file) {
  const rel = relative(pagesDir, file).replace(/\\/g, '/');
  return '/' + rel.replace(/index\.astro$/, '').replace(/\.astro$/, '');
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

// Block-level tags become line breaks; everything else (code, strong, a, span…)
// is stripped in place so inline-formatted sentences stay on one line.
const BLOCK_TAGS = 'p|div|section|article|h[1-6]|li|ul|ol|tr|td|th|table|pre|br|hr' +
  '|blockquote|header|footer|nav|main|figure|figcaption|dl|dt|dd|DocLayout';
const BLOCK_TAG_RE = new RegExp(`</?(?:${BLOCK_TAGS})(?:\\s[^>]*)?>`, 'gi');

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

function extractText(source) {
  let body = source.replace(/^---[\s\S]*?---/, ''); // frontmatter
  body = stripElement(body, 'script');
  body = stripElement(body, 'style');
  body = stripElement(body, 'svg');
  body = body.replace(BLOCK_TAG_RE, '\n');
  body = replaceUntilStable(body, /<[^>]*>/g, ''); // strip remaining inline tags, keep their text content
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
