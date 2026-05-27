import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@auth/components': path.resolve(__dirname, './src/features/auth/components'),
      '@auth/components/*': path.resolve(__dirname, './src/features/auth/components/*'),
      '@auth/types': path.resolve(__dirname, './src/features/auth/types'),
      '@auth/service': path.resolve(__dirname, './src/features/auth/service'),
      '@kanban/shared': path.resolve(__dirname, '../../packages/shared/src'),
    },
  },
  server: {
    port: 5174,
    host: true,
    allowedHosts: ['dev.kanban.branhamkaranja.com'],
  },
});
