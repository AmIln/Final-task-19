import { apiSearchProductsByGet } from "../../../apiRequests/apiSearchProductsByGet";
import { SearchResult } from "../../interfaces/SearchResult";
import { createElement } from "../createElement";
import { createCardSearchResult } from "./createCardSearchResult";

export async function showSearchResult(input: HTMLInputElement): Promise<void> {
  const productsWrapper = document.querySelector(".productsMain") as HTMLDivElement;
  productsWrapper.querySelectorAll(".card-link").forEach((element) => element.remove());
  productsWrapper.querySelector(".nothingFound")?.remove();

  const products = await apiSearchProductsByGet(input.value);

  if (products.results.length === 0) {
    const notProduct = createElement("span", "nothingFound", "Nothing was found for your request(");
    productsWrapper.append(notProduct);
  } else {
    const results = products.results as [SearchResult];
    results.forEach((result) => {
      const card = createCardSearchResult(result);
      productsWrapper.append(card);
    });
  }
}
