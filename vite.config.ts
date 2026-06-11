import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  // base используется как basename для BrowserRouter в src/App.tsx — для GitHub Pages
  base: "/remix-of-case-management-hub/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      // Локальный alias на ui-kit (prebuilt npm-tarball 0.283.0).
      // В проде будет ставиться как обычный npm-пакет.
      // Порядок важен: более специфичный subpath — раньше.
      "@sber-orm/ui-kit/index.css": path.resolve(
        __dirname,
        "./packages/ui-kit/dist/index.css",
      ),
      "@sber-orm/ui-kit": path.resolve(
        __dirname,
        "./packages/ui-kit/dist/index.js",
      ),
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
});
