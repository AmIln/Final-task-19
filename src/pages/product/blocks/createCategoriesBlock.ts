import { Result } from "../../../helpers/interfaces/Results";
import { createElement } from "../../../helpers/creators/createElement";
import { createLink } from "../../../helpers/creators/createLink";
import { getCategoryById } from "../../../apiRequests/getCategoryById";

export function createCategoriesBlock(product: Result): HTMLElement {
  const categories = product.masterData.current.categories;
  const categoriesBlock = createElement("div", "categories");

  categories.forEach((category) => {
    getCategoryById(category.id).then((categoryDescription) => {
      const href = categoryDescription?.slug?.en;
      if (href) {
        const category = createLink("category-link", "#" + href, false);
        category.textContent = href;
        if (href === "chocolate") {
          categoriesBlock.prepend(category);
        } else {
          categoriesBlock.append(category);
        }
      }
    });
  });

  return categoriesBlock;
}
