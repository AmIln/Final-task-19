//import { ShoppingList } from "../../helpers/interfaces/ShoppingList";
import { ShoppingList } from "@commercetools/platform-sdk";
import { apiGetProductById } from "../apiGetProductById";
import { apiGetShoppingList } from "./apiGetShoppingList";

export async function apiAddProductToShoppingList(idProduct: string) {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);

  const product = await apiGetProductById(idProduct);

  const shoppingList = (await apiGetShoppingList()) as unknown as ShoppingList;

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
