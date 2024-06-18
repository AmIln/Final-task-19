import { createElement } from "../../helpers/creators/createElement";
import { formSearch } from "../search/formSearch";
import { formFilter } from "../filter/formFilter";
import { formSorted } from "./sorted";
import { priceRange } from "../filter/priceRange";
import { resetFilters } from "../filter/resetFilters";
const styles = require("./sorted.module.scss");

export function addFilterSorted(parent: HTMLElement): void {
  const settingsSection = createElement("div", "settings-section");

  const filterFinder = createElement("div", styles.filterFinder);
  filterFinder.classList.add("filterFinder_hide");

  const filterIcon = createElement("span", styles.filterIcon);
  filterIcon.addEventListener("click", (event: Event) => {
    if (event.target === filterIcon) {
      filterFinder.classList.remove("filterFinder_hide");
    }
  });

  const closeButton = createElement("span", "filterFinder__close");
  closeButton.addEventListener("click", (event: Event) => {
    if (event.target === closeButton) {
      filterFinder.classList.add("filterFinder_hide");
    }
  });

  const resetFilterButton = createElement("button", "reset-filters", "Reset filters");
  resetFilterButton.addEventListener("click", () => {
    resetFilters();
  });

  const form = formSearch();
  const filter = formFilter();
  const range = priceRange();
  const sorted = formSorted();

  filterFinder.append(closeButton, filter, range, sorted, resetFilterButton);
  filterIcon.append(filterFinder);
  settingsSection.append(filterIcon, form);
  parent.append(settingsSection);
}
