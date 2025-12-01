import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import viteCompression from 'vite-plugin-compression';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {},
      exportAsDefault: true,
    }),
    cssInjectedByJsPlugin(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
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

          // 3. Roteamento (Separado para não bloquear o início)
          if (id.includes('node_modules/react-router') || id.includes('node_modules/react-router-dom')) {
            return 'react-router';
          }

          // 4. Animações (Framer Motion é pesado, fica isolado)
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