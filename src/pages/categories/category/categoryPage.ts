import { createElement } from "../../../helpers/creators/createElement";
import { apiGetCategoryByKey } from "../../../apiRequests/categories/apiGetCategoryByKey";
import { apiGetProducts } from "../../../apiRequests/apiGetProducts";
import { Result } from "../../../helpers/interfaces/Results";
import { Current } from "../../../helpers/interfaces/Current";
import { TypeId } from "../../../helpers/interfaces/TypeId";
import { createCard } from "../../../helpers/creators/productCard/createCard";
const styles = require("./category.module.scss");

export async function createCategoryPage() {
  const content = document.querySelector(".content") as HTMLDivElement;
  content.innerHTML = "";

  const categoryKey = String(window.location.hash).replace("#", "");
  const currentCategory = await apiGetCategoryByKey(categoryKey);
  const categoryPage = createElement("div", styles.categoryPage, "", currentCategory?.id);
  const categoryProducts = createElement("div", "products");

  const categoryTitle = createElement("h1", "categoryPage__title", currentCategory?.name.en);
  const categoryDescription = createElement("p", "categoryPage__description", currentCategory?.description.en);
  const categoryText = createElement("span", "categoryPage__text", "These are high quality products:");
  categoryPage.append(categoryTitle, categoryDescription, categoryText, categoryProducts);

  const products = await apiGetProducts();

  if (products) {
    const data = JSON.parse(products as string).results;
    for (let i = 0; i < data.length; i++) {
      const result = data[i] as Result;
      const current = result.masterData.current as Current;
      const categories = current.categories as [TypeId];

      categories.forEach(async (category) => {
        if (category.id === categoryPage.id) {
          const cardProduct = await createCard(result);
          categoryProducts.append(cardProduct);
        }
      });
    }
  }
  content.append(categoryPage);
}
