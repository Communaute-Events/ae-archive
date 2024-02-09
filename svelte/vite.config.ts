import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Terminal from 'vite-plugin-terminal'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(),Terminal()],
  build: {
    rollupOptions: {
      external: [
        '/_neutralino_globals.js'
      ]
    }
  },
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib")
    }
  }
})
