import { defineConfig } from 'vite'
import { resolve } from 'path'


export default defineConfig({
  root: "editor",
  base: "/editor/",
  build: {
    rolupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
      '/preview': {
        target: 'http://localhost:3000',
      },
    }
  }
})
