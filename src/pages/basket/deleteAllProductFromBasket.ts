import { apiGetShoppingList } from "../../apiRequests/shoppingList/apiGetShoppingList";
import { emptyBasketPageCreator } from "./emptyBasketPage";
import { apiDeleteProductToShoppingList } from "../../apiRequests/shoppingList/apiDeleteProductToShoppingList";
import { getCart } from "../../apiRequests/shoppingList/getCart";
import { removeLineItemToCart } from "../../apiRequests/shoppingList/removeLineItemToCart";
import { removeDiscoundCodeToCart } from "../../apiRequests/shoppingList/promocodes/removeDiscoundCodeToCart";

export async function deleteAllProductFromBasket(): Promise<void> {
  const list = await apiGetShoppingList();
  if (list) {
    const arrayProductID = [...list.lineItems];

    for (const item of arrayProductID) {
      await apiDeleteProductToShoppingList(item.productId, true);
    }
  }

  await removeDiscoundCodeToCart();

  const cart = await getCart();
  if (cart) {
    const arrayProductInCart = cart.lineItems;
    for (const item of arrayProductInCart) {
      await removeLineItemToCart(item.productId);
    }
  }

  emptyBasketPageCreator();
  const qualityWraper = document.querySelector(".count_product_wraper") as HTMLElement;
  qualityWraper.innerHTML = `0`;
}
