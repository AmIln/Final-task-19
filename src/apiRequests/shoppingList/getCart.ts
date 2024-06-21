import { Cart } from "@commercetools/platform-sdk";
import { getProjectHost } from "../../helpers/getsAPI";

export async function getCart(): Promise<Cart | false> {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);
  const host = getProjectHost();
  const cartId = sessionStorage.getItem("cartId");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as const,
  };

  try {
    const response = await fetch(`${host}/carts/${cartId}`, requestOptions);
    const result = await response.text();
    const json = JSON.parse(result) as Cart;

    return json;
  } catch (error) {
    console.log(error);
    return false;
  }
}
