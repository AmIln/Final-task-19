import { getProjectHost } from "../../helpers/getsAPI";
import { LineItem } from "../../helpers/interfaces/LineItem";
import { ShoppingList } from "../../helpers/interfaces/ShoppingList";
import { apiGetShoppingList } from "./apiGetShoppingList";
import { getCart } from "./getCart";
import { getIdListByProductId } from "./getIdListByProductId";

export async function removeLineItemToCart(idProduct: string): Promise<void> {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);
  const host = getProjectHost();

  const shoppingList = (await apiGetShoppingList()) as ShoppingList;
  const cart = await getCart();
  if (!cart) return;

  const idLineItem = (await getIdListByProductId(idProduct, shoppingList)) as LineItem;

  const raw = JSON.stringify({
    version: cart.version,
    actions: [
      {
        action: "removeLineItem",
        lineItemId: idLineItem.id,
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

    return json;
  } catch (error) {
    console.log(error);
  }
}
