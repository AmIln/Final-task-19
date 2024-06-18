import { apiGetShoppingList } from "../../apiRequests/shoppingList/apiGetShoppingList";
import { emptyBasketPageCreator } from "./emptyBasketPage";
import { apiDeleteProductToShoppingList } from "../../apiRequests/shoppingList/apiDeleteProductToShoppingList";
import { asyncForEach } from "./asyncForEach";
import { LineItem } from "../../helpers/interfaces/LineItem";

export async function deleteAllProductFromBasket() {
  const list = await apiGetShoppingList();
  if (typeof list !== "boolean") {
    const arrayProductID = [...list.lineItems];

    asyncForEach(arrayProductID, async (item: LineItem) => {
      await apiDeleteProductToShoppingList(item.productId, true);
    });
  }
  emptyBasketPageCreator();
  const qualityWraper = document.querySelector(".count_product_wraper") as HTMLElement;
  qualityWraper.innerHTML = `0`;
}
