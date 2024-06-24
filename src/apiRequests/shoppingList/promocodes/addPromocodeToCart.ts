import { LineItem } from "@commercetools/platform-sdk";
import { getProjectHost } from "../../../helpers/getsAPI";
import { Promotion } from "../../../helpers/interfaces/Promotion";
import { createNotification } from "../../../notification/createNotificationElem";
import { apiGetProductById } from "../../apiGetProductById";
import { apiGetDiscountCodes } from "../apiGetDiscountCodes";
import { getCart } from "../getCart";
import { getPromocodeByKey } from "./getPromocodeByKey";
import { removeDiscoundCodeToCart } from "./removeDiscoundCodeToCart";

export async function addPromocodeToCart(key: string): Promise<void | false> {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);
  const host = getProjectHost();

  // удаляем промокоды с корзины (если есть, и если key верный)
  const promocodes = await apiGetDiscountCodes();
  if (promocodes?.includes(key)) {
    await removeDiscoundCodeToCart();
  }

  const cart = await getCart();
  if (!cart) return;

  const promocode = await getPromocodeByKey(key);
  if (!promocode) return;

  const matchesPredicate = await evaluateCartPredicate(cart.lineItems, promocode);

  if (matchesPredicate) {
    const raw = JSON.stringify({
      version: cart.version,
      actions: [
        {
          action: "addDiscountCode",
          code: promocode.key,
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
      await fetch(`${host}/carts/${cart.id}`, requestOptions);
    } catch (error) {
      console.log("error", error);
    }
  } else {
    //Промокод не подходит под вашу корзину
    createNotification("info", "Promo code does not match your cart");
    return false;
  }
}

export async function evaluateCartPredicate(list: LineItem[], promo: Promotion): Promise<boolean> {
  // если промокод просто по всей корзине
  if (promo.cartPredicate === "1 = 1") {
    return true;
  }

  const categoryIdMatch = promo.cartPredicate ? promo.cartPredicate.match(/categories\.id\s*=\s*\("([^"]+)"\)/) : false;
  if (!categoryIdMatch) {
    return true;
  }

  const categoryId = categoryIdMatch[1];

  for (const lineItem of list) {
    const product = await apiGetProductById(lineItem.productId);
    if (!product) return false;

    for (const category of product.masterData.current.categories) {
      if (category.id === categoryId) {
        return true;
      }
    }
  }

  return false;
}
