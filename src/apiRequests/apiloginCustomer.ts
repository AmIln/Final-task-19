import { checkEmptyBasket } from "../helpers/checks/checkEmptyBasket";
import { createNotification } from "../notification/createNotificationElem";
import { transferAnonymousBasket } from "./shoppingList/transferAnonymousBasket";

export const loginUser = async (accessToken: string, email: string, password: string) => {
  const apiHost = "https://api.us-central1.gcp.commercetools.com";
  const projectKey = "rsschool-asdaasd";

  const url = `${apiHost}/${projectKey}/me/login`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const body = JSON.stringify({
    email: email,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: body,
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    const result = await response.json();
    createNotification("success", "Login successful! Welcome back.");
    const emptyBasket = await checkEmptyBasket();

    localStorage.setItem("customerId", result.customer.id);
    localStorage.setItem("basketKey", `${result.customer.firstName}-shopping-list`);
    sessionStorage.removeItem("basketKey");

    // если корзина не пустая, то добавить в корзину пользователя товары с анонимной корзины
    if (emptyBasket) {
      for (const item of emptyBasket) {
        await transferAnonymousBasket(item);
      }
    }
    return result;
  } catch (error) {
    createNotification("error", "Authentication failed. Verify your Email and Password and  try again.");
  }
};
