import { redrawProducts } from "../../../modules/filter/redrawProducts";
import { createElement } from "../createElement";

export async function createCountPages(countPages: number, pagesActive: number): Promise<HTMLElement> {
  const pagesBlock = createElement("div", "pages-section");
  for (let i = 0; i < countPages; i++) {
    const page = createElement("div", "page-number", `${i + 1}`);
    if (i === pagesActive) page.classList.add("page-number_active");
    page.textContent = String(i + 1);
    page.addEventListener("click", () => {
      if (!page.classList.contains("page-number_active")) {
        const pages = document.querySelectorAll(".page-number");
        const currentPage = Array.from(pages).indexOf(page);

        redrawProducts(currentPage);
      }
    });
    pagesBlock.append(page);
  }
  return pagesBlock;
}
