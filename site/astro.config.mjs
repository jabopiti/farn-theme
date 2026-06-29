import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://farn.jbpt.de',
  server: { port: Number(process.env.PORT) || 4321 },
  vite: {
    server: {
      fs: {
        // Allow Vite dev server to serve files outside site/ (for token imports)
        allow: ['..'],
      },
    },
  },
});
