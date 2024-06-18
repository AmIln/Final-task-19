import { createElement } from "../../helpers/creators/createElement";
import { createInput } from "../../helpers/creators/createInput";
import { redrawProducts } from "./redrawProducts";

export function priceRange(): HTMLDivElement {
  const rangeWrapper = createElement("div", "price-range") as HTMLDivElement;

  const minInput = createInput("range", "min-price", "min-price", "min-price", false);
  minInput.min = "0";
  minInput.max = "10";
  minInput.value = "0";
  minInput.addEventListener("input", () => {
    minCounter.textContent = minInput.value + "$";
  });
  minInput.addEventListener("change", () => {
    redrawProducts();
  });
  const minLabel = createElement("label", "min-label", "Minimum price:") as HTMLLabelElement;
  minLabel.htmlFor = "min-price";

  const maxInput = createInput("range", "max-price", "max-price", "max-price", false);
  maxInput.min = "10";
  maxInput.max = "100";
  maxInput.value = "100";
  maxInput.addEventListener("input", () => {
    maxCounter.textContent = maxInput.value + "$";
  });
  maxInput.addEventListener("change", () => {
    redrawProducts();
  });
  const maxLabel = createElement("label", "max-label", "Maximum price:") as HTMLLabelElement;
  maxLabel.htmlFor = "max-price";

  const counterWrapper = createElement("div", "counter-wrapper");
  const minCounter = createElement("span", "counter-min", minInput.value + "$");
  const separator = createElement("span", "counter-separator", "-");
  const maxCounter = createElement("span", "counter-max", maxInput.value + "$");
  counterWrapper.append(minCounter, separator, maxCounter);

  rangeWrapper.append(minLabel, minInput, maxLabel, maxInput, counterWrapper);
  return rangeWrapper;
}
