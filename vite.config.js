import { defineConfig } from 'vite'
import { resolve } from 'path'
import handlebars from 'vite-plugin-handlebars'
import { readFileSync } from 'fs'

const iconsPath = resolve(__dirname, 'node_modules/@iconify-json/mdi/icons.json')
const iconsData = JSON.parse(readFileSync(iconsPath))
// console.log(Object.keys(iconsData))

var data
try {
  data = await import('./data.json')
} catch (e) {
  if (e.code !== 'ERR_MODULE_NOT_FOUND') {
    throw e;
  }
  console.log('data.json missing, load data.example.json')
  data = await import('./data.example.json')
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
          const icon = iconsData.icons[name]
          if (!icon) return `no icon ${name}`
          return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          ${icon.body}</svg>`
        }
      }
    }),
  ],
})
