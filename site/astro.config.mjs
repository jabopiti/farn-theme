import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://farn.jbpt.de',
  redirects: {
    '/getting-started':            '/docs/getting-started',
    '/tokens/colors':              '/docs/foundations/color',
    '/tokens/typography':          '/docs/foundations/typography',
    '/tokens/spacing':             '/docs/foundations/spacing',
    '/components':                 '/docs/components',
    '/docs/components/buttons':    '/docs/components',
    '/docs/components/cards':      '/docs/components',
    '/docs/components/forms':      '/docs/components',
    '/docs/components/navigation': '/docs/components',
  },
  vite: {
    server: {
      fs: {
        // Allow Vite dev server to serve files outside site/ (for token imports)
        allow: ['..'],
      },
    },
  },
});
