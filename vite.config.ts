/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import million from 'million/compiler';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

const isDevelopment = process.env.NODE_ENV === 'development';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), million.vite({ auto: true }), TanStackRouterVite()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
    exclude: ['src/e2e'],
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    reporters: 'verbose',
    coverage: {
      provider: 'istanbul',
    },
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: isDevelopment ? 3000 : 8080,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:8080',
    proxy: {
      '^/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
