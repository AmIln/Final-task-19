export function createElement(tag: string, className: string, text?: string, id?: string): HTMLElement {
  const element = document.createElement(tag);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  if (id) {
    element.id = id;
  }
  return element;
}
