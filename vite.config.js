import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import handlebars from 'vite-plugin-handlebars'
import { VitePWA } from 'vite-plugin-pwa'
import { getIconSVG } from './icons'

// envs
const DATA_FILE = process.env.DATA_FILE,
  OUT_DIR = process.env.OUT_DIR,
  WEBMANIFEST_NAME = process.env.WEBMANIFEST_NAME,
  WEBMANIFEST_DESCRIPTION = process.env.WEBMANIFEST_DESCRIPTION,
  WEBMANIFEST_SHORT_NAME = process.env.WEBMANIFEST_SHORT_NAME,
  WEBMANIFEST_SCOPE = process.env.WEBMANIFEST_SCOPE,
  NO_PWA = process.env.NO_PWA;

let dataFile = DATA_FILE || './data.json'
console.log('use DATA_FILE: ', dataFile)

var data
try {
  data = JSON.parse(readFileSync(dataFile))
} catch (e) {
  if (e.code === 'ENOENT' && !DATA_FILE) {
    console.log('data.json missing, fall back to data.example.json')
    data = await import('./data.example.json')
  } else {
    throw e;
  }
}

const manifest = {
  "name": WEBMANIFEST_NAME || "SUI2",
  "short_name": WEBMANIFEST_SHORT_NAME || "sui2",
  "description": WEBMANIFEST_DESCRIPTION || "a startpage for your server and / or new tab page",
  "icons": [
    {
      "src": "icon-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "scope": "/",
  "start_url": "/",
  "display": "standalone"
}

if (WEBMANIFEST_SCOPE) {
  manifest.scope = WEBMANIFEST_SCOPE
  manifest.start_url = WEBMANIFEST_SCOPE
}

export default defineConfig({
  // use relative path for assets
  base: "",
  build: {
    // put assets in the same folder as index.html
    assetsDir: ".",
    outDir: OUT_DIR || 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [
    NO_PWA ? null
    : VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      // https://developer.chrome.com/docs/workbox/modules/workbox-build/#generatesw-mode
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        // https://developer.chrome.com/docs/workbox/reference/workbox-build/#property-GeneratePartial-navigateFallback
        navigateFallback: '404.html',
      },
      manifest,
    }),
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
  ].filter(x => x !== null),
})
