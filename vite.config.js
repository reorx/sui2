import { defineConfig } from 'vite'
import { resolve } from 'path'
import * as links from './links.json'
import * as providers from './providers.json'
import * as apps from './apps.json'
import handlebars from 'vite-plugin-handlebars'

console.log('apps', apps)

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
      context: {
        'bookmarks': links.bookmarks,
        'providers': providers.providers,
        'apps': apps.apps,
      }
    }),
  ],
})
