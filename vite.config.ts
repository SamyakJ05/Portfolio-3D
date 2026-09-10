import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react-vendor';
          // Let Vite keep the 3D module behind its lazy import. Forcing its
          // dependencies into a chunk can also pull the preload helper into it.
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
});
