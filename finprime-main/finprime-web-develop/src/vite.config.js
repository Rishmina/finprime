import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'project-1-main'),
  publicDir: path.resolve(__dirname, 'project-1-main/public'),
  build: {
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit to 1000 KB
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'project-1-main/index.html')
      },
      output: {
        manualChunks(id) {
          // Split libraries into 'vendor' chunk
          if (id.includes('node_modules')) {
            return 'vendor'; // Bundle all node_modules into 'vendor' chunk
          }

          // Dynamically split routes or large files
          if (id.includes('components')) {
            return 'components'; // Bundle all components into 'components' chunk
          }
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5002'
    }
},
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'project-1-main')
    }
  },
  assetsInclude: ['**/*.JPG', '**/*.PNG', '**/*.GIF', '**/*.SVG', '**/*.mp4'],
});