// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://volkanolab.com',
  server: {
    host: true,
  },
  integrations: [
    keystatic(),
    tailwind(),
    mdx(),
    react(),
    sitemap()
  ],
  output: 'static',
  adapter: node({
    mode: 'standalone',
  }),
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    preview: {
      allowedHosts: true,
    },
  },
});
