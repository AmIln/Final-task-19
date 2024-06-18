import { createInput } from "../../helpers/creators/createInput";
import { createElement } from "../../helpers/creators/createElement";
import { redrawProducts } from "./redrawProducts";

export function formFilter(): HTMLDivElement {
  const filterWrapper = createElement("div", "filter") as HTMLDivElement;
  const filterDescription = createElement("span", "filter__description", "What products to display:");

  const milkInput = createInput("checkbox", "filter__input", "filter-milk", "filter-milk", false);
  const milkLabel = createElement("label", "filter__label", "Milk chocolate") as HTMLLabelElement;
  milkLabel.htmlFor = "filter-milk";
  const milkBlock = createElement("div", "filter-block");
  milkInput.addEventListener("change", async () => {
    localStorage.setItem("milk-filter", String(milkInput.checked));
    redrawProducts();
  });
  milkBlock.append(milkInput, milkLabel);

  const nutsInput = createInput("checkbox", "filter__input", "filter-nuts", "filter-nuts", false);
  const nutsLabel = createElement("label", "filter__label", "Chocolate with nuts") as HTMLLabelElement;
  nutsLabel.htmlFor = "filter-nuts";
  const nutsBlock = createElement("div", "filter-block");
  nutsInput.addEventListener("change", () => {
    localStorage.setItem("nuts-filter", String(nutsInput.checked));
    redrawProducts();
  });
  nutsBlock.append(nutsInput, nutsLabel);

  const darkInput = createInput("checkbox", "filter__input", "filter-dark", "filter-dark", false);
  const darkLabel = createElement("label", "filter__label", "Dark chocolate") as HTMLLabelElement;
  darkLabel.htmlFor = "filter-dark";
  const darkBlock = createElement("div", "filter-block");
  darkInput.addEventListener("change", () => {
    localStorage.setItem("dark-filter", String(darkInput.checked));
    redrawProducts();
  });
  darkBlock.append(darkInput, darkLabel);

  const assortedInput = createInput("checkbox", "filter__input", "filter-assorted", "filter-assorted", false);
  const assortedLabel = createElement("label", "filter__label", "Assorted") as HTMLLabelElement;
  assortedLabel.htmlFor = "filter-assorted";
  const assortedBlock = createElement("div", "filter-block");
  assortedInput.addEventListener("change", () => {
    localStorage.setItem("assorted-filter", String(assortedInput.checked));
    redrawProducts();
  });
  assortedBlock.append(assortedInput, assortedLabel);

  filterWrapper.append(filterDescription, milkBlock, nutsBlock, darkBlock, assortedBlock);

  if (localStorage.getItem("milk-filter") !== null) {
    milkInput.checked = localStorage.getItem("milk-filter") === "false" ? false : true;
    nutsInput.checked = localStorage.getItem("nuts-filter") === "false" ? false : true;
    darkInput.checked = localStorage.getItem("dark-filter") === "false" ? false : true;
    assortedInput.checked = localStorage.getItem("assorted-filter") === "false" ? false : true;
  } else {
    localStorage.setItem("milk-filter", "true");
    localStorage.setItem("nuts-filter", "true");
    localStorage.setItem("dark-filter", "true");
    localStorage.setItem("assorted-filter", "true");
  }

  return filterWrapper;
}
