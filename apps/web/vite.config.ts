import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@*': path.resolve(__dirname, './src/*'),
      '@auth/components': path.resolve(__dirname, './src/features/auth/components'),
      '@auth/types': path.resolve(__dirname, './src/features/auth/types'),
      '@auth/service': path.resolve(__dirname, './src/features/auth/service'),
      '@appUtils': path.resolve(__dirname, './src/utils'),
      '@authSlice': path.resolve(__dirname, './src/features/auth/slice'),
      '@kanban/shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@dashboard': path.resolve(__dirname, './src/features/dashboard'),
    },
  },
  server: {
    port: 5173,
    host: true,
    allowedHosts: ['software.branhamkaranja.com'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/scss/mixins" as *;
        `,
      },
    },
  },
});
