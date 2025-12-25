// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';
import partytown from '@astrojs/partytown';

export default defineConfig({
    site: 'https://obrasdigitales.es',
    trailingSlash: 'never', // URLs limpias: /contacto en lugar de /contacto/
    integrations: [react(), sitemap(), mdx(), partytown({
        config: {
            forward: ['dataLayer.push'],
            debug: false,
        },
    })],
    adapter: netlify(),

    // Optimización de imágenes
    image: {
        domains: ['obrasdigitales.es', 'images.unsplash.com'],
    },
 // Prefetch para transiciones más rápidas
    prefetch: {
        prefetchAll: true, // Prefetch automático de todos los links
        defaultStrategy: 'hover', // Carga al hacer hover (más rápido que 'viewport')
    },
    // Optimización de build
    build: {
        inlineStylesheets: 'auto',
    },

    // Compresión HTML
    compressHTML: true,

    // Seguridad (importante para formularios)
    security: {
        checkOrigin: true, // CSRF protection activada
    },
    
    // Configuración de Vite con Tailwind v4
    vite: {
        plugins: [tailwindcss()], // ← AQUÍ es donde va Tailwind v4
        build: {
            cssMinify: true,
            minify: 'esbuild',
        },
        ssr: {
            external: ['resend'],
        },
    },
});