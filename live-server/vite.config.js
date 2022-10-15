import { defineConfig } from 'vite'
import { resolve } from 'path'


export default defineConfig({
  root: "frontend",
  // use relative path for assets
  base: "",
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
      }
    }
  }
})
