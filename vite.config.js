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
    // MELHORIA: Brotli comprime mais que Gzip (ótimo para 4G/Mobile)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  build: {
    minify: 'terser', // Agora vai funcionar com o comando acima
    cssCodeSplit: true, // Garante que o CSS carregue sob demanda
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
            // Se tiver lottie instalado, descomente abaixo:
            // if (id.includes('lottie')) return 'lottie';

            return 'vendor';
          }
        },
      },
    },
  },
});