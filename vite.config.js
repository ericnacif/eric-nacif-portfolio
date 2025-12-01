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
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 1. Separa o React Core (Necessário para iniciar)
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/scheduler')) {
            return 'react-core';
          }

          // 2. Separa o Router (Navegação)
          if (id.includes('node_modules/react-router') || id.includes('node_modules/react-router-dom')) {
            return 'react-router';
          }

          // 3. Separa o Framer Motion (Pesado, animações)
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }

          // 4. Separa os Ícones (Geralmente grande parte do código não usado vem daqui)
          if (id.includes('node_modules/react-icons')) {
            return 'react-icons';
          }

          // 5. Outras dependências (Vendor genérico)
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});