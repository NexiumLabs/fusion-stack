import { defineConfig } from "@tanstack/start/config"
import tailwindcss from "@tailwindcss/vite"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.ico", "icons/*.png"],
        manifest: {
          name: "{{PROJECT_NAME}}",
          short_name: "{{PROJECT_NAME}}",
          description: "{{PROJECT_NAME}} — built with fusion-stack",
          theme_color: "#090B0C",
          background_color: "#090B0C",
          display: "standalone",
          icons: [
            { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          ],
        },
      }),
    ],
  },
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
})
