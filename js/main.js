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
  console.log('done DOMContentLoaded', `${new Date() - t0}ms`)
})
