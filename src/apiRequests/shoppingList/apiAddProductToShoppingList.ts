import { getProjectHost } from "../../helpers/getsAPI";
import { ShoppingList } from "../../helpers/interfaces/ShoppingList";
import { apiGetProductById } from "../apiGetProductById";
import { addShoppingListToCart } from "./addShoppingListToCart";
import { apiGetShoppingList } from "./apiGetShoppingList";

export async function apiAddProductToShoppingList(idProduct: string): Promise<void> {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);
  const host = getProjectHost();

  const product = await apiGetProductById(idProduct);
  const shoppingList = (await apiGetShoppingList()) as ShoppingList;

  const raw = JSON.stringify({
    version: shoppingList.version,
    actions: [
      {
        action: "addLineItem",
        productId: product?.id,
        quantity: 1,
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
    const response = await fetch(`${host}/shopping-lists/${shoppingList.id}`, requestOptions);

    const result = await response.text();
    const json = JSON.parse(result);

    // добавляем продукт в корзину
    await addShoppingListToCart();

    return json;
  } catch (error) {
    console.log(error);
  }
}
