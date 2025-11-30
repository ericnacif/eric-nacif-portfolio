import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {},
      exportAsDefault: true,
    }),
    // Comprime os arquivos (Gzip) reduzindo o tamanho em até 70%
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('lottie')) { // Se usar Lottie, separa também
               return 'lottie';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});