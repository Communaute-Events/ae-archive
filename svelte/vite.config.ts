import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Terminal from 'vite-plugin-terminal'

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-expect-error
  plugins: [svelte(),Terminal()],
  build: {
    rollupOptions: {
      external: [
        '/_neutralino_globals.js'
      ]
    }
  }
})
