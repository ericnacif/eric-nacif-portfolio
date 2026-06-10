import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    minify: 'terser',
    cssCodeSplit: true, // Garante CSS sob demanda
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 1. Core do React (Pequeno e essencial)
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'react-core';
          }

          // 2. React DOM (Renderização)
          if (id.includes('node_modules/react-dom')) {
            return 'react-dom';
          }

          // 3. Animações (Framer Motion é pesado, fica isolado)
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }

          // 5. Ícones (Só carrega o necessário)
          if (id.includes('node_modules/react-icons')) {
            return 'react-icons';
          }
        },
      },
    },
  },
});