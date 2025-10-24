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
});