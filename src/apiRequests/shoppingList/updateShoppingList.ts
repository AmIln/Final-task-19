import { Cart } from "@commercetools/platform-sdk";
import { getProjectHost } from "../../helpers/getsAPI";
import { apiGetShoppingList } from "./apiGetShoppingList";

export async function updateShoppingList(cart: Cart) {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);
  const host = getProjectHost();

  if (cart.lineItems.length <= 0) return;

  for (const item of cart.lineItems) {
    const list = await apiGetShoppingList();
    if (!list) return;
    const raw = JSON.stringify({
      version: list.version,
      actions: [
        {
          action: "addLineItem",
          productId: item.productId,
          variantId: 1,
          quantity: item.quantity,
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
      const response = await fetch(`${host}/shopping-lists/${list.id}`, requestOptions);

      const result = await response.text();
      const json = JSON.parse(result);

      return json;
    } catch (error) {
      console.log(error);
    }
  }
}
