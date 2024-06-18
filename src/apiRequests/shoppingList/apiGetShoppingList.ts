import { ShoppingList } from "../../helpers/interfaces/ShoppingList";
import { apiInitialization } from "../apiInitialization";

export async function apiGetShoppingList(): Promise<ShoppingList | false> {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);

  const anonymous = `Anonymous-${token}-shopping-list`;
  const userBasket = localStorage.getItem("basketKey");

  const shoppingKey = userBasket ? userBasket : anonymous;

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as const,
  };

  try {
    const response = await fetch(
      `https://api.us-central1.gcp.commercetools.com/rsschool-asdaasd/shopping-lists/key=${shoppingKey}`, // delete -shopping-list
      requestOptions,
    );
    const result = await response.text();

    // такой корзины нет, (значит пользователь анонимный + у него нет корзины) // по идее такой ошибки никогда уже не будет
    // т.к корзина создается при загрузке сайта, но всё же
    if (JSON.parse(result).statusCode === 404) {
      return false;
    }

    // исправление ошибки Unauthorized
    if (JSON.parse(result).statusCode === 401) {
      await apiInitialization();
      location.reload();
    }

    const json = JSON.parse(result) as ShoppingList;
    return json;
  } catch (error) {
    console.log(error);
    return false;
  }
}
