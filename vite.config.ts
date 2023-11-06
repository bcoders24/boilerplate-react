import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components/pages",
      common: "/src/components/common",
      controls: "/src/components/controls",
      pages: "/src/pages",
      store: "/src/store",
      styles: "/src/styles",
      routes: "/src/routes",
      api: "/src/api",
      utils: "/src/utils",
      models: "/src/models",
      assets: "/src/assets",
      services: "/src/services",
      constants: "/src/constants",
    },
  },
});
