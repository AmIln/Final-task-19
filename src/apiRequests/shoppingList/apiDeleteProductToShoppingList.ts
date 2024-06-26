import { getProjectHost } from "../../helpers/getsAPI";
import { LineItem } from "../../helpers/interfaces/LineItem";
import { ShoppingList } from "../../helpers/interfaces/ShoppingList";
import { apiGetShoppingList } from "./apiGetShoppingList";
import { changeLineItemQuantityCart } from "./changeLineItemQuantityCart";
import { getIdListByProductId } from "./getIdListByProductId";
import { removeLineItemToCart } from "./removeLineItemToCart";

export async function apiDeleteProductToShoppingList(idProduct: string, deleteAll?: boolean): Promise<void> {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);
  const host = getProjectHost();

  const shoppingList = (await apiGetShoppingList()) as ShoppingList;

  const idLineItem = (await getIdListByProductId(idProduct, shoppingList)) as LineItem;

  let resQuantity = idLineItem.quantity - 1;
  // удалить полностью товар из корзины/шопинг-листа
  if (deleteAll || resQuantity <= 0) {
    resQuantity = 0;
    await removeLineItemToCart(idProduct);
  }
  // ТОВАРА БОЛЬШЕ НЕТ В КОРЗИНЕ
  if (!idLineItem.quantity) {
    await removeLineItemToCart(idProduct);
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
    const response = await fetch(`${host}/shopping-lists/${shoppingList.id}`, requestOptions);

    const result = await response.text();
    const json = JSON.parse(result);

    // обновляем корзину вместе в шоппинг-листом
    await changeLineItemQuantityCart();

    return json;
  } catch (error) {
    console.log(error);
  }
}
