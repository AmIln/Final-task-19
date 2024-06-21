import { getProjectHost } from "../../helpers/getsAPI";
import { ShoppingList } from "../../helpers/interfaces/ShoppingList";
import { getCustomerById } from "../getCustomerById";
import { apiGetShoppingList } from "./apiGetShoppingList";
import { createCart } from "./createCart";

export async function apiCreateShoppingList(customerId: string): Promise<ShoppingList | null> {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);
  const host = getProjectHost();

  const customer = await getCustomerById(customerId);
  const customerShoppingList = (await apiGetShoppingList()) as ShoppingList;

  if (customerShoppingList) {
    return customerShoppingList as ShoppingList;
  }

  const raw = JSON.stringify({
    name: {
      en: `${customer.firstName} shopping list`,
    },
    slug: {
      en: `${customer.firstName}-shopping-list`,
    },
    customer: {
      typeId: "customer",
      id: `${customerId}`,
    },
    key: `${customer.firstName}-shopping-list`,
    deleteDaysAfterLastModification: 3,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow" as const,
  };

  try {
    const response = await fetch(`${host}/shopping-lists`, requestOptions);

    const result = await response.text();
    const json = JSON.parse(result) as ShoppingList;

    // create Cart
    await createCart();

    return json;
  } catch (error) {
    console.log(error);
    return null;
  }
}
