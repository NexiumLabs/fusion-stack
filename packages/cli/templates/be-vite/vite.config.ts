import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { resolve } from "node:path"
import { apiPlugin } from "./src/server/plugin"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    apiPlugin(),
  ],
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
})
