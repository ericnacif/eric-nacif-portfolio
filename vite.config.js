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
          // OTIMIZAÇÃO DE CADEIA:
          // Agrupa React e Router juntos. É melhor baixar um arquivo médio de uma vez
          // do que ficar abrindo várias conexões pequenas (Waterfall).
          if (id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/react-router-dom') ||
            id.includes('node_modules/scheduler')) {
            return 'react-vendor';
          }

          // Framer Motion continua separado pois é grande e nem sempre crítico no frame 0
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }

          // Ícones separados (carregam sob demanda se possível)
          if (id.includes('node_modules/react-icons')) {
            return 'react-icons';
          }
        },
      },
    },
  },
});