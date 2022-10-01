import { defineConfig } from 'vite'
import { resolve } from 'path'
import handlebars from 'vite-plugin-handlebars'
import { getIconSVG } from './icons'

let dataFilename = process.env.DATA_FILENAME || './data.json'

var data
try {
  data = await import(dataFilename)
} catch (e) {
  if (e.code !== 'ERR_MODULE_NOT_FOUND') {
    throw e;
  }
  if (!process.env.DATA_FILENAME) {
    console.log('data.json missing, fall back to data.example.json')
    data = await import('./data.example.json')
  }
}


export default defineConfig({
  // use relative path for assets
  base: "",
  build: {
    // put assets in the same folder as index.html
    assetsDir: ".",
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [
    handlebars({
      context: data,
      helpers: {
        iconify: (name) => {
          const svg = getIconSVG(name)
          if (!svg) return `no icon ${name}`
          return svg
        },
        domain: (url) => {
          var o = new URL(url);
          if (o.port) {
            return `${o.hostname}:${o.port}`
          }
          return o.hostname
        }
      }
    }),
  ],
})
