import { createElement } from "../../helpers/creators/createElement";
import { redrawProducts } from "../filter/redrawProducts";

export function formSorted(): HTMLDivElement {
  const sortedWrapper = createElement("div", "sorted") as HTMLDivElement;

  const sortedDescription = createElement("span", "sorted__description", "Sort by:");
  const select = createElement("select", "sortedBy") as HTMLSelectElement;
  select.name = "sorted";
  select.addEventListener("change", () => {
    localStorage.setItem("sortedBy", select.value);
    redrawProducts();
  });

  const anyway = createElement("option", "sortedBy__option", "anyway") as HTMLOptionElement;
  anyway.value = "anyway";

  const priceReduction = createElement("option", "sortedBy__option", "price reduction") as HTMLOptionElement;
  priceReduction.value = "priceDown";

  const priceIncrease = createElement("option", "sortedBy__option", "price increase") as HTMLOptionElement;
  priceIncrease.value = "priceUp";

  select.append(anyway, priceReduction, priceIncrease);
  sortedWrapper.append(sortedDescription, select);

  if (localStorage.getItem("sortedBy") !== null) {
    const options = document.querySelectorAll(".sortedBy__option") as NodeListOf<HTMLOptionElement>;
    options.forEach((option: HTMLOptionElement) => {
      if (option.value === localStorage.getItem("sortedBy")) {
        option.selected = true;
      }
    });
  } else {
    localStorage.setItem("sortedBy", "anyway");
    anyway.selected = true;
  }

  select.value = localStorage.getItem("sortedBy") || "anyway";

  return sortedWrapper;
}
