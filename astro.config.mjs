// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

export default defineConfig({
    site: 'https://obrasdigitales.es',

    integrations: [
        react(),
        sitemap(),
        mdx(),
    ],
    adapter: netlify(),

    // Optimización de imágenes
    image: {
        domains: ['obrasdigitales.es', 'images.unsplash.com'],
    },

    // Optimización de build
    build: {
        inlineStylesheets: 'auto',
    },

    // Compresión HTML
    compressHTML: true,

    // Configuración de Vite con Tailwind v4
    vite: {
        plugins: [tailwindcss()], // ← AQUÍ es donde va Tailwind v4
        build: {
            cssMinify: true,
            minify: 'esbuild',
            terserOptions: {
                compress: {
                    drop_console: true,
                },
            },
        },
        ssr: {
            external: ['resend'],
        },
    },
});