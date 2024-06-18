import { createInput } from "../../helpers/creators/createInput";
import { createElement } from "../../helpers/creators/createElement";
import { showSearchResult } from "../../helpers/creators/productCard/showSearchResult";
const styles = require("./formSearch.module.scss");

export function formSearch(): HTMLFormElement {
  const form = document.createElement("form");
  form.classList.add(styles["search-form"]);
  form.id = "search";
  const input = createInput("search", "search__input", "search__input", "search__input", false);
  input.placeholder = "Find here...";
  const button = createElement("button", "search__button", "", "search__button");
  const iconButton = createElement("span", "fa-search");
  iconButton.classList.add("fa-2x", "fa");
  button.append(iconButton);

  form.addEventListener("submit", async (event: Event) => {
    event.preventDefault();
    if (!input.value) {
      return;
    }
    showSearchResult(input);
  });

  form.append(input, button);
  return form;
}
