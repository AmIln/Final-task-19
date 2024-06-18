import { apiGetShoppingList } from "../../apiRequests/shoppingList/apiGetShoppingList";
import { LineItem } from "../interfaces/LineItem";
import { ShoppingList } from "../interfaces/ShoppingList";

export async function checkEmptyBasket(): Promise<false | [LineItem]> {
  const basket = (await apiGetShoppingList()) as ShoppingList;
  if (basket.lineItems.length > 0) {
    return basket.lineItems;
  }
  return false;
}
