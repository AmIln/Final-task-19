import { loading } from "../../../modules/loading/loading";
import { apiGetProductById } from "../../../apiRequests/apiGetProductById";
import { createContent } from "../../../helpers/creators/productCard/createContent";

export async function showProduct(target: HTMLElement): Promise<void> {
  const idProduct = target.id;
  console.log("target:", target);
  console.log("idProduct:", idProduct);

  const result = await apiGetProductById(idProduct);
  Promise.resolve(result)?.then((resolvedResult) => {
    if (resolvedResult) {
      const contentTag = document.querySelector(".content") as HTMLElement;
      contentTag.innerHTML = "";
      createContent(contentTag, resolvedResult);
      loading();
    } else {
      console.error("Result is undefined.");
    }
  });
}
