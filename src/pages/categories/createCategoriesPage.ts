import { createElement } from "../../helpers/creators/createElement";
import { createLink } from "../../helpers/creators/createLink";
import { apiQueryCategories } from "../../apiRequests/categories/apiQueryCategories";
import { Category } from "../../helpers/interfaces/Category";
const styles = require("./categories.module.scss");

export function createCategoriesPage() {
  const content = document.querySelector(".content") as HTMLDivElement;
  content.innerHTML = "";

  const categoryPage = createElement("div", styles.categoriesPage);
  const categoriesTitle = createElement(
    "h1",
    "categoriesPage__title",
    "There are products in these categories on our website:",
  );
  categoryPage.append(categoriesTitle);
  const allCategories = apiQueryCategories();
  allCategories.then((categories) => {
    const results = categories.results;

    results.forEach((category: Category) => {
      const categoryLink = createLink("category", `#${category.name.en}`, false);
      const categoryName = createElement("h3", "category__name", category.name.en);
      const categoryDescription = createElement("p", "category__description", category.description.en);
      categoryLink.append(categoryName, categoryDescription);
      categoryPage.append(categoryLink);
    });
  });

  content.append(categoryPage);
}
