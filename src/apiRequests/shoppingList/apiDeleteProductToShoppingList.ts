import { LineItem } from "../../helpers/interfaces/LineItem";
import { ShoppingList } from "../../helpers/interfaces/ShoppingList";
import { apiGetShoppingList } from "./apiGetShoppingList";
import { getIdListByProductId } from "./getIdListByProductId";

export async function apiDeleteProductToShoppingList(idProduct: string, deleteAll?: boolean): Promise<void> {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);

  const shoppingList = (await apiGetShoppingList()) as ShoppingList;

  const idLineItem = (await getIdListByProductId(idProduct, shoppingList)) as LineItem;

  let resQuantity = idLineItem.quantity - 1;
  if (deleteAll) resQuantity = 0;
  // ТОВАРА БОЛЬШЕ НЕТ В КОРЗИНЕ
  if (!idLineItem.quantity) {
    return;
  }

  const raw = JSON.stringify({
    version: shoppingList.version,
    actions: [
      {
        action: "changeLineItemQuantity",
        lineItemId: idLineItem.id,
        quantity: resQuantity,
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
