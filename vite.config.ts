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
      // Локальный alias на ui-kit, который в проде будет внешним npm-пакетом.
      // Указываем на src, т.к. dist в репозитории не собран.
      "@sber-orm/ui-kit": path.resolve(__dirname, "./packages/ui-kit/src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
});
