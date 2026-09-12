import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/postcss";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/analog-ic-design-portfolio/",
  plugins: [react()],
  css: { postcss: { plugins: [tailwindcss()] } },
  build: {
    rolldownOptions: {
      input: {
        projects: fileURLToPath(new URL("./index.html", import.meta.url)),
        labs: fileURLToPath(new URL("./labs/index.html", import.meta.url)),
      },
    },
  },
});
