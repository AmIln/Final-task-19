import { getProjectHost } from "../../helpers/getsAPI";
import { getCart } from "./getCart";

export async function removeLineItemToCart(idProduct: string): Promise<void> {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);
  const host = getProjectHost();

  const cart = await getCart();
  if (!cart) return;

  const LineItem = cart.lineItems.find((item) => {
    if (item.productId === idProduct) {
      return item.id;
    }
    return false;
  });
  if (!LineItem) return;

  const raw = JSON.stringify({
    version: cart.version,
    actions: [
      {
        action: "removeLineItem",
        lineItemId: LineItem.id,
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
