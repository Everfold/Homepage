// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    optimizeDeps: {
      // Keep the dev toolbar's virtual module out of dependency prebundling.
      exclude: ['astro:toolbar:internal'],
    },

    plugins: [tailwindcss()],
  },
    site: 'https://everfold.org',
  integrations: [
    react(),
    sitemap(),
    starlight({
      title: 'Everfold Document',
    }),]
});