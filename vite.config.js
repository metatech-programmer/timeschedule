import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Para actualizar automáticamente el service worker
      manifest: {
        name: 'Timeschedule',
        short_name: 'Schedule',
        description: 'Planificador de horarios',
        start_url: './',
        display: 'standalone',
        background_color: '#2A3A49',
        theme_color: '#2A3A49',
        icons: [
          {
            src: './icon.webp',
            sizes: '192x192',
            type: 'image/webp'
          },
          {
            src: './icon.webp',
            sizes: '512x512',
            type: 'image/webp'
          }
        ],
        lang: 'es',
        categories: ['productivity', 'utilities', 'tools'],
        screenshots: [
          {
            src: './screenshot1.jpg',
            sizes: '640x480',
            type: 'image/webp'
          }
        ],
        orientation: 'portrait-primary',
        related_applications: [],
        prefer_related_applications: false,
        scope: './',
        dir: 'ltr',
        related_applications: [
          {
            platform: 'web',
            url: 'https://timeschedulee.vercel.app',
            id: 'https://timeschedulee.vercel.app'
          }
        ],


      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,webp,gif}'], // Archivos que serán cacheados
        maximumFileSizeToCacheInBytes: 30 * 1024 * 1024, // 30 MB
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 días
              }
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst' // Usa la red primero para documentos
          }
        ]
      }
    })
  ]
});
