import { Result } from "../../../helpers/interfaces/Results";

export function createProductDescr(data: Result): HTMLElement {
  const descrWrapper: HTMLDivElement = document.createElement("div");
  descrWrapper.className = "descrWrapper";

  const title: HTMLHeadingElement = document.createElement("h2");
  title.className = "product-tittle";
  title.textContent = data.masterData.current.name.en;

  const descr: HTMLParagraphElement = document.createElement("p");
  descr.className = "product-descr";
  descr.textContent = data.masterData.current.description.en;

  descrWrapper.append(title, descr);
  return descrWrapper;
}
