import { getProjectHost } from "../../helpers/getsAPI";
import { ShoppingList } from "../../helpers/interfaces/ShoppingList";
import { apiGetShoppingList } from "./apiGetShoppingList";
import { changeLineItemQuantityCart } from "./changeLineItemQuantityCart";
import { getCart } from "./getCart";

export async function addShoppingListToCart() {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);
  const host = getProjectHost();

  const shoppingList = (await apiGetShoppingList()) as ShoppingList;
  const cart = await getCart();
  if (!cart) return;

  const raw = JSON.stringify({
    version: cart.version,
    actions: [
      {
        action: "addShoppingList",
        shoppingList: {
          id: shoppingList.id,
          typeId: "shopping-list",
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow" as const,
  };

  try {
    const response = await fetch(`${host}/carts/${cart.id}`, requestOptions);

    const result = await response.text();
    const json = JSON.parse(result);

    // меняем количество товаров в корзине
    await changeLineItemQuantityCart();

    return json;
  } catch (error) {
    console.log(error);
  }
}
