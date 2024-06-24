import { getCustomerById } from "../getCustomerById";
import { apiCreateAnonymousShoppingList } from "./apiCreateAnonymousShoppingList";
import { apiCreateShoppingList } from "./apiCreateShoppingList";
import { apiGetShoppingList } from "./apiGetShoppingList";
import { ShoppingList } from "../../helpers/interfaces/ShoppingList";
import { createCart } from "./createCart";

export async function createBasket(): Promise<ShoppingList> {
  const user = localStorage.getItem("customerId");
  const customer = user ? await getCustomerById(user) : false;
  const token = sessionStorage.getItem("token");

  // создаем корзину
  await createCart();

  // если пользователь вошел в систему
  if (user) {
    const shoppingListUser = await apiGetShoppingList();
    if (shoppingListUser) {
      return shoppingListUser;
    }

    const newShoppingListUser = (await apiCreateShoppingList(customer.id)) as ShoppingList;
    localStorage.setItem("basketKey", `${customer.firstName}-shopping-list`);
    return newShoppingListUser;
  } else {
    // анонимный пользователь
    const anonymousShoppingList = await apiGetShoppingList();

    // проверяем есть ли анонимный лист покупок
    if (anonymousShoppingList) {
      return anonymousShoppingList;
    } else {
      // создаем анонимный лист покупок
      await apiCreateAnonymousShoppingList();
      sessionStorage.setItem("basketKey", `Anonymous-${token}-shopping-list`);
      return (await apiGetShoppingList()) as ShoppingList;
    }
  }
}
