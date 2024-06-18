import { createElement } from "./createElement";

export function createSelectCountry(): HTMLSelectElement {
  const select = createElement("select", "select-country", "", "country") as HTMLSelectElement;
  const optionRU = createElement("option", "option", "Russia") as HTMLOptionElement;
  optionRU.value = "RU";
  const optionBY = createElement("option", "option", "Belarus") as HTMLOptionElement;
  optionBY.value = "BY";
  select.append(optionRU, optionBY);
  return select;
}
