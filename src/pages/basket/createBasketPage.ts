import { getTotalCost } from "./getTotalCost";
import { apiGetDiscountCodes } from "../../apiRequests/shoppingList/apiGetDiscountCodes";
import { emptyBasketPageCreator, isEmptyBasket } from "./emptyBasketPage";
import { deleteAllProductFromBasket } from "./deleteAllProductFromBasket";
import { showBasketItems } from "./showBasketItems";
import {
  addPromocodeToCart,
  evaluateCartPredicate,
} from "../../apiRequests/shoppingList/promocodes/addPromocodeToCart";
import { getCart } from "../../apiRequests/shoppingList/getCart";
import { getPromocodeById } from "../../apiRequests/shoppingList/promocodes/getPromocodeById";
import { getCartDiscoundByKey } from "../../apiRequests/shoppingList/promocodes/getCartDiscoundByKey";
import { createNotification } from "../../notification/createNotificationElem";
import { createElement } from "../../helpers/creators/createElement";
import { Cart } from "@commercetools/platform-sdk";
import { Promotion } from "../../helpers/interfaces/Promotion";
import { promocodeDoesNotWork } from "./promocodeDoesNotWork";

export async function createBasketPage(): Promise<void> {
  if (await isEmptyBasket()) {
    emptyBasketPageCreator();
    return;
  }

  const content = document.querySelector(".content") as HTMLDivElement;
  content.innerHTML = "";

  const costAndPromoWraper = createElement("div", "cost_promo_wraper");
  const totalCostWraper = createElement("div", "total_cost_wraper");

  await showBasketItems();
  let cart = await getCart();
  if (!cart) return;

  //const counter = document.querySelector(".count_product_wraper") as HTMLElement;
  //counter.textContent = String(cart.lineItems.length);

  const discountWraper = createElement("div", "discont_wraper");

  const discontInput = document.createElement("input");
  discontInput.id = "discont_input";
  discontInput.placeholder = "Input promo code";
  discontInput.classList.add("discont_input");

  const discontBtn = createElement("div", "discont_btn", "apply code");
  discontBtn.classList.add("nav__item");

  const modalWindowWraper = createElement("div", "modal_window_wraper");
  const overFlow = createElement("div", "modal_overflow");
  const modalWindow = createElement("div", "modal_window");
  const modalWindowText = createElement(
    "div",
    "modal_window-text",
    "You want to remove all products from your carts. Are you sure?",
  );
  const modalBtnWraper = createElement("div", "modal_btn_wraper");
  const YesBtn = createElement("div", "nav__item", "Yes");
  const NoBtn = createElement("div", "nav__item", "No");
  modalBtnWraper.append(YesBtn, NoBtn);
  modalWindow.append(modalWindowText, modalBtnWraper);
  modalWindowWraper.append(overFlow, modalWindow);

  const deleteAllBtn = createElement("div", "delete_all_btn", "Clear Shopping Cart", "delete_all_btn");
  deleteAllBtn.classList.add("nav__item");

  deleteAllBtn.addEventListener("click", () => {
    modalWindowWraper.style.display = "flex";
  });
  overFlow.addEventListener("click", () => {
    modalWindowWraper.style.display = "none";
  });
  NoBtn.addEventListener("click", () => {
    modalWindowWraper.style.display = "none";
  });
  YesBtn.addEventListener("click", async () => {
    await deleteAllProductFromBasket();
    modalWindowWraper.style.display = "none";
  });

  discountWraper.append(discontInput, discontBtn);
  costAndPromoWraper.append(discountWraper, deleteAllBtn, totalCostWraper);
  content.append(costAndPromoWraper, modalWindowWraper);

  await getTotalCost(totalCostWraper);

  if (cart.discountCodes.length > 0) {
    const activePromocode = await getPromocodeById(cart.discountCodes[0].discountCode.id);

    discontInput.value = activePromocode ? activePromocode.key : "";
    const discound = await getCartDiscoundByKey(discontInput.value);
    if (!discound) return;

    await getTotalCost(totalCostWraper, cart, discound);
    /*discontInput.classList.add("true_promo_code");
    discontInput.classList.remove("false_promo_code");*/
  }

  discontInput.addEventListener("click", () => {
    discontInput.select();
  });

  discontBtn.addEventListener("click", async () => {
    const arrayOfCodes = await apiGetDiscountCodes();

    if (arrayOfCodes?.includes(discontInput.value)) {
      const discound = getCartDiscoundByKey(discontInput.value) as unknown as Promotion;
      cart = (await getCart()) as Cart;

      if (!(await evaluateCartPredicate(cart.lineItems, discound))) {
        promocodeDoesNotWork(totalCostWraper, cart.totalPrice.centAmount);
      }

      await addPromocodeToCart(discontInput.value);
      cart = await getCart();

      if (cart && cart.discountCodes.length > 0) {
        const discound = await getCartDiscoundByKey(discontInput.value);
        if (!discound) return false;

        await getTotalCost(totalCostWraper, cart, discound);
      } else {
        await getTotalCost(totalCostWraper);
      }
    } else {
      createNotification("error", "non-existent promo code");

      discontInput.classList.remove("true_promo_code");
      discontInput.classList.add("false_promo_code");

      await getTotalCost(totalCostWraper);
    }
  });
}
