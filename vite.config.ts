import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      assets: '/src/assets',
      components: '/src/components',
      constants: '/src/constants',
      hoc: 'src/hoc',
      hooks: 'src/hooks',
      layouts: '/src/layouts',
      lib: '/src/lib',
      models: '/src/models',
      pages: '/src/pages',
      routes: '/src/routes',
      stores: 'src/stores',
      styles: '/src/styles',
      utils: '/src/utils',
      services: 'src/services',
    },
  },
});
