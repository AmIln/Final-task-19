import { getCustomerById } from "../getCustomerById";
import { apiCreateAnonymousShoppingList } from "./apiCreateAnonymousShoppingList";
import { apiCreateShoppingList } from "./apiCreateShoppingList";
import { apiGetShoppingList } from "./apiGetShoppingList";
import { ShoppingList } from "../../helpers/interfaces/ShoppingList";
import { createCart } from "./createCart";
import { getCart } from "./getCart";
import { updateShoppingList } from "./updateShoppingList";

export async function createBasket(): Promise<ShoppingList> {
  const user = localStorage.getItem("customerId");
  const customer = user ? await getCustomerById(user) : false;
  const token = sessionStorage.getItem("token");

  // создаем корзину
  await createCart();
  let list = await apiGetShoppingList();

  // если пользователь вошел в систему
  if (user) {
    if (!list) {
      list = await apiCreateShoppingList(customer.id);
      localStorage.setItem("basketKey", `${customer.firstName}-shopping-list`);
    }
  } else {
    // проверяем есть ли анонимный лист покупок
    if (!list) {
      await apiCreateAnonymousShoppingList();
      sessionStorage.setItem("basketKey", `Anonymous-${token}-shopping-list`);
      list = await apiGetShoppingList();
    }
  }
  const cart = await getCart();
  if (cart) {
    await updateShoppingList(cart);
  }

  return list as ShoppingList;
}
