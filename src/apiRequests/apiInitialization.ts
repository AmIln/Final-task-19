import { getAuthUrl } from "../helpers/getsAPI";
import { createBasket } from "./shoppingList/createBasket";

export async function apiInitialization() {
  const myHeaders = new Headers();
  const host = getAuthUrl();

  myHeaders.append(
    "Authorization",
    "Basic U09VWV8wNGdqRlpZbmo0N0hHQlp1Y3dTOm05S1RNOUpfdkM1OGt2cm9UZmdWVWNrN2ZVdV92WEdq", // new
  );

  const raw = "";

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow" as const,
  };

  try {
    const response = await fetch(`${host}/oauth/token?grant_type=client_credentials`, requestOptions);

    const result = await response.text();

    const token = JSON.parse(result).access_token;
    const tokenType = JSON.parse(result).token_type;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("token-type", tokenType);

    await createBasket(); // создаем корзину при входе на сайт (если ее нет)
  } catch (error) {
    console.error(error);
  }
}
