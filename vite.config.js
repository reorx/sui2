import { defineConfig } from 'vite'
import { resolve } from 'path'
import handlebars from 'vite-plugin-handlebars'

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
  // base: "",
  build: {
    // put assets in the same folder as index.html
    // assetsDir: ".",
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [
    handlebars({
      context: data,
    }),
  ],
})
