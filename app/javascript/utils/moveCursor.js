export const moveCursor = (caret, event) => {
  const element = event.target
  window.requestAnimationFrame(() => {
    element.selectionStart = caret
    element.selectionEnd = caret
  })
}
