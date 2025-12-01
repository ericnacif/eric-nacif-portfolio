import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import viteCompression from 'vite-plugin-compression';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'; // <--- Importado aqui

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {},
      exportAsDefault: true,
    }),
    // OTIMIZAÇÃO: Injeta o CSS no JS para evitar render-blocking (solicitação de rede extra)
    cssInjectedByJsPlugin(),

    // MELHORIA: Brotli comprime mais que Gzip (ótimo para 4G/Mobile)
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