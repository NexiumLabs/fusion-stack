import { defineConfig } from "@tanstack/start/config"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
})
