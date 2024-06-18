import { apiGetShoppingList } from "../../apiRequests/shoppingList/apiGetShoppingList";
import { ShoppingList } from "../interfaces/ShoppingList";

export async function checkProductInBasket(idProduct: string): Promise<string> {
  let quantity = "0";
  const ShoppingList = (await apiGetShoppingList()) as ShoppingList;
  ShoppingList.lineItems.forEach((list) => {
    if (list.productId === idProduct) {
      quantity = String(list.quantity);
    }
  });

  return quantity;
}
