import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Add options to ensure default export is a React component
    svgr({
      svgrOptions: {
        // Config options for SVGR plugin
      },
      // Ensures SVGs are treated as React components by default
      exportAsDefault: true,
    }),
  ],
  build: {
    // Reduz o tamanho final removendo espaços e comentários
    minify: 'terser',
    rollupOptions: {
      output: {
        // Code Splitting: Divide bibliotecas pesadas em arquivos separados
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // React Core fica num arquivo separado (cacheável)
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            // Framer Motion é pesado, separamos para não travar o carregamento inicial
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            // Outras libs
            return 'vendor';
          }
        },
      },
    },
  },
});