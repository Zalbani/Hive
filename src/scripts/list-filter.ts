const ALL_VALUE = 'all'

interface FilterElements {
  items: HTMLElement[]
  buttons: HTMLButtonElement[]
  empty: HTMLElement | null
}

interface FilterState {
  value: string
}

function collectElements(root: HTMLElement): FilterElements {
  return {
    items: [...root.querySelectorAll<HTMLElement>('[data-filter-item]')],
    buttons: [...root.querySelectorAll<HTMLButtonElement>('[data-filter-value]')],
    empty: root.querySelector<HTMLElement>('[data-filter-empty]'),
  }
}

function matches(item: HTMLElement, state: FilterState): boolean {
  return state.value === ALL_VALUE || item.dataset.filterKey === state.value
}

function render(elements: FilterElements, state: FilterState): void {
  elements.items.forEach((item) => {
    item.hidden = !matches(item, state)
  })
  elements.buttons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.filterValue === state.value))
  })
  if (elements.empty) elements.empty.hidden = elements.items.some((item) => !item.hidden)
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

// During a filter change each item gets its own view-transition name, so the browser slides the
// items that stay to their new position and fades the ones that appear or disappear. The names
// are removed afterwards: left in place, they would also pair items across page navigations.
// A skipped transition (e.g. a click while the page transition still runs) rejects `ready`; the
// filter is applied anyway, so the rejection is simply absorbed.
function setItemNames(elements: FilterElements, isNamed: boolean): void {
  elements.items.forEach((item, index) => {
    item.style.viewTransitionName = isNamed ? `filter-item-${String(index)}` : ''
  })
}

async function renderWithTransition(elements: FilterElements, state: FilterState): Promise<void> {
  const canAnimate = 'startViewTransition' in document && !reducedMotion.matches
  if (!canAnimate) {
    render(elements, state)
    return
  }
  setItemNames(elements, true)
  const transition = document.startViewTransition(() => {
    render(elements, state)
  })
  try {
    await transition.ready
    await transition.finished
  } catch {
    return
  } finally {
    setItemNames(elements, false)
  }
}

function initFilterRoot(root: HTMLElement): void {
  const elements = collectElements(root)
  const state: FilterState = { value: ALL_VALUE }
  root.querySelectorAll<HTMLElement>('[data-filter-controls]').forEach((controls) => {
    controls.hidden = false
  })
  elements.buttons.forEach((button) => {
    button.addEventListener('click', () => {
      state.value = button.dataset.filterValue ?? ALL_VALUE
      void renderWithTransition(elements, state)
    })
  })
}

document.querySelectorAll<HTMLElement>('[data-filter-root]').forEach(initFilterRoot)
