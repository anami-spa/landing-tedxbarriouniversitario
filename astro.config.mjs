import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), '');

const SITE_URL = env.SITE_URL || process.env.SITE_URL || 'https://tedxbarriouniversitario.cl';
// BASE_PATH: vacío para Cloudflare Pages (raíz), '/landing-tedxbarriouniversitario' para GitHub Pages
const BASE_PATH = env.BASE_PATH || process.env.BASE_PATH || '';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sitemap(),
  ],

  build: {
    inlineStylesheets: 'auto',
  },

  compressHTML: true,

  devToolbar: {
    enabled: false,
  },
});
