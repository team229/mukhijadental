// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://mukhijadentalclinic.com',
  integrations: [react()],
  server: {
    host: true,
    allowedHosts: ['.trycloudflare.com', 'web.clickboostmedia.com', '.clickboostmedia.com'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
