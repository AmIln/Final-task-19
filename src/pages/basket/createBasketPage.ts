import { getTotalCost } from "./getTotalCost";
import { apiGetDiscountCodes } from "../../apiRequests/shoppingList/apiGetDiscountCodes";
import { emptyBasketPageCreator, isEmptyBasket } from "./emptyBasketPage";
import { deleteAllProductFromBasket } from "./deleteAllProductFromBasket";
import { showBasketItems } from "./showBasketItems";
import { addPromocodeToCart } from "../../apiRequests/shoppingList/promocodes/addPromocodeToCart";
import { getCart } from "../../apiRequests/shoppingList/getCart";
import { getPromocodeById } from "../../apiRequests/shoppingList/promocodes/getPromocodeById";
import { getCartDiscoundByKey } from "../../apiRequests/shoppingList/promocodes/getCartDiscoundByKey";
import { removeAllLinesItemToCart } from "../../apiRequests/shoppingList/removeAllLinesItemToCart";
import { createNotification } from "../../notification/createNotificationElem";

export async function createBasketPage() {
  const content = document.querySelector(".content") as HTMLDivElement;
  content.innerHTML = "";

  const costAndPromoWraper = document.createElement("div");
  costAndPromoWraper.classList.add("cost_promo_wraper");

  const totalCostWraper = document.createElement("div");
  totalCostWraper.classList.add("total_cost_wraper");
  const isEmpty = await isEmptyBasket();

  await showBasketItems();

  const arrayOfCodes = await apiGetDiscountCodes();

  // получение корзины
  const cartId = sessionStorage.getItem("cartId");
  if (!cartId) return false;
  const cart = await getCart();

  const discountWraper = document.createElement("div");
  discountWraper.classList.add("discont_wraper");
  const discontInput = document.createElement("input");
  discontInput.placeholder = "Input promo code";
  discontInput.classList.add("discont_input");

  if (cart && cart.discountCodes.length > 0) {
    const activePromocode = await getPromocodeById(cart.discountCodes[0].discountCode.id);

    discontInput.value = activePromocode ? activePromocode.key : "";
    const discound = await getCartDiscoundByKey(discontInput.value);
    if (!discound) return false;

    await getTotalCost(totalCostWraper, cart, discound);
    discontInput.classList.add("true_promo_code");
    discontInput.classList.remove("false_promo_code");
  }

  discontInput.addEventListener("click", () => {
    discontInput.select();
  });

  const discontBtn = document.createElement("div");
  discontBtn.classList.add("discont_btn");
  discontBtn.classList.add("nav__item");
  discontBtn.innerHTML = "apply code";
  discontBtn.addEventListener("click", async () => {
    if (arrayOfCodes?.includes(discontInput.value)) {
      discontInput.classList.add("true_promo_code");
      discontInput.classList.remove("false_promo_code");

      await addPromocodeToCart(discontInput.value);

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

  const modalWindowWraper = document.createElement("div");
  modalWindowWraper.classList.add("modal_window_wraper");
  const overFlow = document.createElement("div");
  overFlow.classList.add("modal_overflow");
  const modalWindow = document.createElement("div");
  modalWindow.classList.add("modal_window");
  const modalWindowText = document.createElement("div");
  modalWindowText.innerHTML = "You want to remove all products from your carts. Are you sure?";
  const modalBtnWraper = document.createElement("div");
  modalBtnWraper.classList.add("modal_btn_wraper");
  const YesBtn = document.createElement("div");
  YesBtn.classList.add("nav__item");
  YesBtn.innerHTML = "Yes";
  const NoBtn = document.createElement("div");
  NoBtn.classList.add("nav__item");
  NoBtn.innerHTML = "No";
  modalBtnWraper.append(YesBtn, NoBtn);
  modalWindow.append(modalWindowText, modalBtnWraper);
  modalWindowWraper.append(overFlow, modalWindow);

  const deleteAllBtn = document.createElement("div");
  deleteAllBtn.classList.add("delete_all_btn", "nav__item");
  deleteAllBtn.setAttribute("id", "delete_all_btn");
  deleteAllBtn.innerHTML = "Clear Shopping Cart";

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
    await removeAllLinesItemToCart();
    modalWindowWraper.style.display = "none";
  });

  discountWraper.append(discontInput, discontBtn);
  costAndPromoWraper.append(discountWraper, deleteAllBtn, totalCostWraper);
  content.append(costAndPromoWraper, modalWindowWraper);
  if (isEmpty) {
    emptyBasketPageCreator();
  }
}
