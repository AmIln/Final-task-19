import { createQualityInBasket } from "../../helpers/creators/createQuantityInBasket";
import { Promotion } from "../../helpers/interfaces/Promotion";
import { Cart } from "@commercetools/platform-sdk";
import { calculatePriceAfterDiscound } from "./calculatePriceAfterDiscound";
import { getCart } from "../../apiRequests/shoppingList/getCart";
import { evaluateCartPredicate } from "../../apiRequests/shoppingList/promocodes/addPromocodeToCart";
import { getPromocodeById } from "../../apiRequests/shoppingList/promocodes/getPromocodeById";
import { isEmptyBasket } from "./emptyBasketPage";
import { createElement } from "../../helpers/creators/createElement";
import { promocodeDoesNotWork } from "./promocodeDoesNotWork";
require("./basketPage.scss");

export async function getTotalCost(wraper: HTMLElement, cart?: Cart, discound?: Promotion): Promise<void> {
  if (await isEmptyBasket()) return;

  const userCart = await getCart();
  console.log(userCart);

  if (userCart && userCart.lineItems.length > 0 && discound) {
    if (!(await evaluateCartPredicate(userCart.lineItems, discound))) {
      promocodeDoesNotWork(wraper, userCart.totalPrice.centAmount);
      return;
    } else {
      const discontInput = document.getElementById("discont_input") as HTMLInputElement;
      discontInput.classList.add("true_promo_code");
      discontInput.classList.remove("false_promo_code");
    }
  }

  if (userCart && userCart.lineItems.length > 0 && userCart.discountCodes.length > 0) {
    const discound = getPromocodeById(userCart.discountCodes[0].discountCode.id) as unknown as Promotion;
    if (!(await evaluateCartPredicate(userCart.lineItems, discound))) {
      promocodeDoesNotWork(wraper, userCart.totalPrice.centAmount);
      return;
    } else {
      const discontInput = document.getElementById("discont_input") as HTMLInputElement;
      discontInput.classList.add("true_promo_code");
      discontInput.classList.remove("false_promo_code");
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
    const costText = createElement("span", "description_total_cost", "The total cost is: ");
    const newCost = createElement("span", "valid_total_cost", `${price.toFixed(1)} $`);
    const oldCost = createElement("span", "invalid_total_cost", `${Math.round(totalCost) / 100} $`);

    wraper.append(costText, newCost, oldCost);
  } else {
    createQualityInBasket();
  }
}
