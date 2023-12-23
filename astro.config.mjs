import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://astro.build/config
export default defineConfig({
  integrations: [basicSsl(), react()],
  server: {
    port: parseInt(import.meta.env.VITE_PORT),
    open: true,
  },
  build: {
    minify: true,
    inlineStylesheets: "never",
  },
});
