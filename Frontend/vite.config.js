import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Use the full URL, but make sure it's properly forwarded.
      "/api": {
        target: "https://training-website-5-0-backend.onrender.com",
        changeOrigin: true, // This ensures the proxy request looks like it's coming from the backend
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove the "/api" prefix before forwarding
      },
    },
  },
});
