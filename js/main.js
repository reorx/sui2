import { greet, date } from "./date";
import { bindThemeButtons, loadTheme } from "./themer";


document.addEventListener('DOMContentLoaded', () => {
  loadTheme()
  date()
  greet()
  bindThemeButtons()
})
