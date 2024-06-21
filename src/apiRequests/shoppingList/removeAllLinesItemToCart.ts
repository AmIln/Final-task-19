import { getProjectHost } from "../../helpers/getsAPI";
import { getCart } from "./getCart";

export async function removeAllLinesItemToCart(): Promise<void> {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);
  const host = getProjectHost();

  const cart = await getCart();
  if (!cart) return;

  for (const item of cart.lineItems) {
    const newCart = await getCart();
    if (!newCart) return;

    const raw = JSON.stringify({
      version: newCart.version,
      actions: [
        {
          action: "removeLineItem",
          lineItemId: item.id,
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
}
