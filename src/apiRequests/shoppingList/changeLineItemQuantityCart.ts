import { getProjectHost } from "../../helpers/getsAPI";
import { ShoppingList } from "../../helpers/interfaces/ShoppingList";
import { apiGetShoppingList } from "./apiGetShoppingList";
import { getCart } from "./getCart";

export async function changeLineItemQuantityCart(): Promise<void> {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);
  const host = getProjectHost();

  const shoppingList = (await apiGetShoppingList()) as ShoppingList;

  for (const lineItem of shoppingList.lineItems) {
    const cart = await getCart();
    if (!cart) return;
    const idCart = cart.lineItems.find((product) => product.productId === lineItem.productId);
    if (!idCart) return;

    const raw = JSON.stringify({
      version: cart.version,
      actions: [
        {
          action: "changeLineItemQuantity",
          lineItemId: idCart.id,
          quantity: lineItem.quantity,
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
      await fetch(`${host}/carts/${cart.id}`, requestOptions);
    } catch (error) {
      console.log(error);
    }
  }
}
