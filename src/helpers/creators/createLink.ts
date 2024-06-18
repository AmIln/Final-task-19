export function createLink(className: string, href: string, targetBlank: boolean): HTMLAnchorElement {
  const link = document.createElement("a");
  link.classList.add(className);
  link.href = href;
  if (targetBlank) {
    link.target = "_blank";
  }
  return link;
}
