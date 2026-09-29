import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En développement, Vite redirige /api vers la passerelle (évite les soucis de CORS).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': process.env.GATEWAY_URL || 'http://localhost:4000',
    },
  },
});
