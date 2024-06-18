require("./aboutUs.scss");

export function createTitulAbout(text: string): HTMLElement {
  const titul = document.createElement("div");
  titul.classList.add("about_titul");
  titul.innerHTML = `${text}`;
  return titul;
}
