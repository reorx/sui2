import { greet, date } from "./date";
import { bindThemeButtons, loadTheme } from "./themer";
import { initKeyboardSearch } from "./search"

const t0 = new Date()

document.addEventListener('DOMContentLoaded', async () => {

  loadTheme()
  date()
  greet()
  bindThemeButtons()
  initKeyboardSearch()

  if (import.meta.env.NO_PWA) {
    console.log('no pwa')
  } else {
    const pwa = await import('virtual:pwa-register')
    const updateSW = pwa.registerSW({
      onNeedRefresh() {
        console.log('onNeedRefresh', `${new Date() - t0}ms`)
        if (window.confirm("Start page has new version, refresh to update?")) {
          updateSW(true)
        }
      },
      onOfflineReady() {
        console.log('onOfflineReady', `${new Date() - t0}ms`)
        console.log('PWA offline is ready')
      }
    })
  }
})
