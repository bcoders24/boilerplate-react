// / <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    define: {
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },

    plugins: [react()],
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 5173,
    },
    resolve: {
      alias: {
        '@': '/src',
        assets: '/src/assets',
        components: '/src/components',
        constants: '/src/constants',
        hoc: '/src/hoc',
        hooks: '/src/hooks',
        layouts: '/src/layouts',
        models: '/src/models',
        features: '/src/features',
        routes: '/src/routes',
        stores: '/src/stores',
        styles: '/src/styles',
        utils: '/src/utils',
        services: '/src/services',
      },
    },
  };
});
