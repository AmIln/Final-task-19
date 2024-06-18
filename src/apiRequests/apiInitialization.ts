import { createBasket } from "./shoppingList/createBasket";

export async function apiInitialization() {
  const myHeaders = new Headers();

  myHeaders.append(
    "Authorization",
    "Basic MG56NkVJV0dYMWxqMlNpeXc4U2FVNHlFOmVXMFRyemo5MHI0QnZlQnpwT1loZ3ZPaVFHQTAyNDRH",
  );

  const raw = "";

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow" as const,
  };

  try {
    const response = await fetch(
      "https://auth.us-central1.gcp.commercetools.com/oauth/token?grant_type=client_credentials",
      requestOptions,
    );
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
