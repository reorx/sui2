import { greet, date } from "./date";
import { bindThemeButtons, loadTheme } from "./themer";
import { initKeyboardSearch } from "./search"
import { registerSW } from 'virtual:pwa-register'

document.addEventListener('DOMContentLoaded', () => {

  loadTheme()
  date()
  greet()
  bindThemeButtons()
  initKeyboardSearch()

  const updateSW = registerSW({
    onNeedRefresh() {
      if (window.confirm("Start page has new version, refresh to update?")) {
        updateSW(true)
      }
    },
    onOfflineReady() {
      console.log('PWA offline is ready')
    }
  })
})
