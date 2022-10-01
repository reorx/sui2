import Fuse from 'fuse.js'

const store = {
  keyword: '',
  searchItems: null,
  fuse: null,
}

function loadSearchItems() {
  const items = []
  // loop .apps_item
  document.querySelectorAll('.apps_item').forEach(el => {
    const nameEl = el.querySelector('.name')
    items.push({
      name: nameEl.textContent,
      el,
      nameEl,
      clsss: 'apps_item',
    })
  })

  // loop .links_item
  document.querySelectorAll('.links_item').forEach(el => {
    const nameEl = el
    items.push({
      name: nameEl.textContent,
      el,
      nameEl,
      clsss: 'links_item',
    })
  })

  store.searchItems = items
  store.fuse = new Fuse(items, {
    keys: ['name'],
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 1,
    threshold: 0.2,
  })
}

const keywordEl = document.getElementById("keyword")
const regularCharsRe = /\w/

function updateKeyword(key) {
  // backspace
  if (key == 8) {
    if (store.keyword.length > 0) {
      store.keyword = store.keyword.slice(0, store.keyword.length - 1)
    }
  } else if (key == 27) {  // ESC
    store.keyword = ''
  } else {
    // convert key code to string, see https://stackoverflow.com/a/5829387/596206
    let char = String.fromCharCode((96 <= key && key <= 105) ? key-48 : key)
    if (!regularCharsRe.test(char)) {
      char = ''
    }
    // console.log('key', key, `|${char}|`)

    if (char) {
      store.keyword = store.keyword + char
    }
  }
  if (store.keyword) {
    keywordEl.innerHTML = `<span>${store.keyword}</span>`
  } else {
    keywordEl.innerHTML = ''
  }
  return store.keyword
}

function handleKeyPress(e) {
  var key = e.keyCode || e.which;
  if (key == 9 || key == 13) { // Tab to switch and Enter to open
      // e.preventDefault();
      // e.stopPropagation();
      // use default behavior
      return
  } else {
    const oldKeyword = store.keyword
    const keyword = updateKeyword(key)
    // ignore empty
    if (oldKeyword === keyword && keyword === '') return

    // only search when keyword changes
    if (keyword !== oldKeyword) {
      const items = store.fuse.search(keyword)
      console.log('searched', keyword, items)
      handleMatchedItems(items)
    }
  }
}

function handleMatchedItems(items) {
  document.activeElement.blur();
  // reset tabindex and name text
  const matchedClass = 'matched'
  store.searchItems.forEach(item => {
    item.el.setAttribute('tabindex', 0)
    item.nameEl.innerHTML = item.name
    item.el.classList.remove(matchedClass)
  })

  items.forEach((i, index) => {
    const item = i.item
    if (index === 0) {
      item.el.focus();
    }
    const tabindex = index + 1
    item.el.setAttribute('tabindex', tabindex)
    item.el.classList.add(matchedClass)

    // because we only have one key to match when initializing Fuse,
    // matches will only have 1 item
    highlightText(item.nameEl, i.matches[0])
  })
}

function highlightText(el, match) {
  console.log('match', match, el)
  // get the longest part
  match.indices.sort((a, b) => (b[1] - b[0]) - (a[1] - a[0]))
  const pos = match.indices[0]
  const start = pos[0], end = pos[1] + 1
  const text = match.value
  el.innerHTML = `${text.slice(0, start)}<em>${text.slice(start, end)}</em>${text.slice(end, text.length)}`
}

export function initKeyboardSearch() {
  loadSearchItems()
  document.addEventListener('keydown', handleKeyPress);
}
