import { greet, date } from "./date";
import { bindThemeButtons, loadTheme } from "./themer";
import { initKeyboardSearch } from "./search"
import { registerSW } from 'virtual:pwa-register'

const t0 = new Date()

document.addEventListener('DOMContentLoaded', () => {

  loadTheme()
  date()
  greet()
  bindThemeButtons()
  initKeyboardSearch()

  const updateSW = registerSW({
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
})
