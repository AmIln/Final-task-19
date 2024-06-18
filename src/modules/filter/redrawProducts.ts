import { apiGetProducts } from "../../apiRequests/apiGetProducts";
import { checkFilters } from "../../helpers/checks/checkFilters";
import { createContent } from "../../helpers/creators/productCard/createContent";
import { createCountPages } from "../../helpers/creators/productCard/createCountPages";
import { Result } from "../../helpers/interfaces/Results";

export async function redrawProducts(pagesNumber?: number): Promise<void> {
  const productsWrapper = document.querySelector(".productsMain") as HTMLDivElement;
  const sorted = document.querySelector(".sortedBy") as HTMLSelectElement;

  productsWrapper.querySelectorAll(".card-link").forEach((element) => element.remove());
  productsWrapper.querySelector(".pages-section")?.remove();

  const products = await apiGetProducts();
  if (!products) return;
  const necessaryElements = pagesNumber ? (pagesNumber + 1) * 9 : 1 * 9;

  let data = JSON.parse(products as string).results;
  data = data.filter((element: Result) => checkFilters(element));

  if (sorted.value != "anyway") {
    data.sort((a: Result, b: Result) => {
      const pricesA = a.masterData.current.masterVariant.prices[0];
      const pricesB = b.masterData.current.masterVariant.prices[0];

      const totalPriceA = pricesA.discounted?.value.centAmount || pricesA.value.centAmount;
      const totalPriceB = pricesB.discounted?.value.centAmount || pricesB.value.centAmount;

      return totalPriceA - totalPriceB;
    });
  }
  if (sorted.value === "priceDown") {
    data.reverse();
  }

  const pages = Math.ceil(data.length / 9);
  if (necessaryElements) {
    data = data.slice(necessaryElements - 9, necessaryElements);
  }

  // проверка на пустые товары
  if (data.length < 1) {
    location.reload();
  }

  await data.forEach(async (element: Result) => {
    const minInput = document.getElementById("min-price") as HTMLInputElement;
    const maxInput = document.getElementById("max-price") as HTMLInputElement;
    const minPrice = Number(minInput.value);
    const maxPrice = Number(maxInput.value);
    const productInCent =
      element.masterData.current.masterVariant.prices[0].discounted?.value.centAmount ||
      element.masterData.current.masterVariant.prices[0].value.centAmount;
    const productPrice = productInCent / 100;

    if (productPrice >= minPrice && productPrice <= maxPrice) {
      if (productsWrapper) {
        createContent(productsWrapper, element);
      }
    }
  });

  if (pages > 1) {
    const pagesBlock = await createCountPages(pages, pagesNumber || 0);
    productsWrapper.append(pagesBlock);
  }
}
