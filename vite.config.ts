import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@tanstack/react-query", "@tanstack/react-query-devtools"],
    // Force a single instance of these packages to prevent context conflicts
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "@tanstack/react-query"],
  },
  server: {
    port: 3000,
    open: true,
  },
});
