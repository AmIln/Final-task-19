import { apiGetShoppingList } from "../../apiRequests/shoppingList/apiGetShoppingList";
import { createQualityInBasket } from "../../helpers/creators/createQuantityInBasket";
import { Promotion } from "../../helpers/interfaces/Promotion";
import { Cart } from "@commercetools/platform-sdk";
import { calculatePriceAfterDiscound } from "./calculatePriceAfterDiscound";
import { getCart } from "../../apiRequests/shoppingList/getCart";
import { evaluateCartPredicate } from "../../apiRequests/shoppingList/promocodes/addPromocodeToCart";
import { getPromocodeById } from "../../apiRequests/shoppingList/promocodes/getPromocodeById";
import { createNotification } from "../../notification/createNotificationElem";
require("./basketPage.scss");

export async function getTotalCost(wraper: HTMLElement, cart?: Cart, discound?: Promotion): Promise<void> {
  const userCart = await getCart();
  const list = await apiGetShoppingList();
  if (userCart && list && discound) {
    if (!(await evaluateCartPredicate(list, discound))) {
      wraper.innerHTML = `The total cost is: ${Math.round(userCart.totalPrice.centAmount) / 100} $`;
      createNotification("info", "Promo code does not match your cart");
      return;
    }
  }
  if (userCart && list && userCart.discountCodes.length > 0) {
    const discound = getPromocodeById(userCart.discountCodes[0].discountCode.id) as unknown as Promotion;
    if (!(await evaluateCartPredicate(list, discound))) {
      wraper.innerHTML = `The total cost is: ${Math.round(userCart.totalPrice.centAmount) / 100} $`;
      createNotification("info", "Promo code does not match your cart");
      return;
    }
  }
  const totalCost = userCart ? userCart.totalPrice.centAmount : 0;
  let price = 0;

  wraper.innerHTML = `The total cost is: ${Math.round(totalCost) / 100} $`;

  if (cart) {
    price = Math.round(cart.totalPrice.centAmount);
    if (discound) {
      price = await calculatePriceAfterDiscound(price, discound, cart);
    }
    wraper.innerHTML = ``;
    const costText = document.createElement("span");
    costText.innerHTML = `The total cost is: `;
    const newCost = document.createElement("span");
    newCost.classList.add("valid_total_cost");
    newCost.innerHTML = `${price.toFixed(1)} $`;

    const oldCost = document.createElement("span");
    oldCost.classList.add("invalid_total_cost");
    oldCost.innerHTML = `${Math.round(totalCost) / 100} $`;

    wraper.append(costText, newCost, oldCost);
  } else {
    createQualityInBasket();
  }
}
