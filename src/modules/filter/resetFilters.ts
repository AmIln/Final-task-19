import { redrawProducts } from "./redrawProducts";

export function resetFilters() {
  const milk = document.getElementById("filter-milk") as HTMLInputElement;
  const nuts = document.getElementById("filter-nuts") as HTMLInputElement;
  const dark = document.getElementById("filter-dark") as HTMLInputElement;
  const assorted = document.getElementById("filter-assorted") as HTMLInputElement;

  const selectSortedBy = document.querySelector(".sortedBy") as HTMLSelectElement;

  const min = document.getElementById("min-price") as HTMLInputElement;
  const max = document.getElementById("max-price") as HTMLInputElement;
  const minCounter = document.querySelector(".counter-min") as HTMLSpanElement;
  const maxCounter = document.querySelector(".counter-max") as HTMLSpanElement;

  milk.checked = true;
  nuts.checked = true;
  dark.checked = true;
  assorted.checked = true;

  selectSortedBy.value = "anyway";

  min.value = "0";
  max.value = "100";
  minCounter.textContent = min.value + "$";
  maxCounter.textContent = max.value + "$";

  localStorage.setItem("milk-filter", "true");
  localStorage.setItem("nuts-filter", "true");
  localStorage.setItem("assorted-filter", "true");
  localStorage.setItem("dark-filter", "true");
  localStorage.setItem("sortedBy", "anyway");
  redrawProducts();
}
