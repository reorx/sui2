import { greet, date } from "./date";
import { bindThemeButtons, loadTheme } from "./themer";
import { initKeyboardSearch } from "./search"


document.addEventListener('DOMContentLoaded', () => {
  loadTheme()
  date()
  greet()
  bindThemeButtons()
  initKeyboardSearch()
})
