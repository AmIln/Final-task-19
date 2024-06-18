import { ShoppingList } from "../../helpers/interfaces/ShoppingList";
import { apiGetShoppingList } from "./apiGetShoppingList";
import { LineItem } from "../../helpers/interfaces/LineItem";

export async function transferAnonymousBasket(product: LineItem): Promise<void> {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);

  const shoppingList = (await apiGetShoppingList()) as ShoppingList;

  const raw = JSON.stringify({
    version: shoppingList.version,
    actions: [
      {
        action: "addLineItem",
        productId: product.productId,
        quantity: product.quantity,
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
    const response = await fetch(
      `https://api.us-central1.gcp.commercetools.com/rsschool-asdaasd/shopping-lists/${shoppingList.id}`,
      requestOptions,
    );
    const result = await response.text();
    const json = JSON.parse(result);
    return json;
  } catch (error) {
    console.log(error);
  }
}
