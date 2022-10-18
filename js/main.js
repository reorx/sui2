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
  setInterval(date, 1000 * 60)
  console.log('done DOMContentLoaded', `${new Date() - t0}ms`)
})
