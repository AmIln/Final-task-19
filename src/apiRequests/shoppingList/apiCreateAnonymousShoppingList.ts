import { ShoppingList } from "../../helpers/interfaces/ShoppingList";
import { apiGetShoppingList } from "./apiGetShoppingList";

export async function apiCreateAnonymousShoppingList(): Promise<ShoppingList | void> {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);

  const anonymousShoppingList = (await apiGetShoppingList()) as ShoppingList;

  // у анонима уже есть корзина
  if (anonymousShoppingList) {
    return anonymousShoppingList;
  }

  const raw = JSON.stringify({
    name: {
      en: `Anonymous-${token} shopping list`,
    },
    slug: {
      en: `Anonymous-${token}-shopping-list`,
    },
    key: `Anonymous-${token}-shopping-list`,
    deleteDaysAfterLastModification: 3,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow" as const,
  };

  try {
    const response = await fetch(
      `https://api.us-central1.gcp.commercetools.com/rsschool-asdaasd/shopping-lists`,
      requestOptions,
    );
    const result = await response.text();
    const json = JSON.parse(result) as ShoppingList;
    sessionStorage.setItem("basketKey", `Anonymous-${token}-shopping-list`);
    return json;
  } catch (error) {
    console.log(error);
  }
}
