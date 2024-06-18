import { getTotalCost } from "./getTotalCost";
import { apiGetDiscountCodes } from "../../apiRequests/shoppingList/apiGetDiscountCodes";
import { useDiscountCodeById } from "../../apiRequests/shoppingList/useDiscountCodeById";
import { emptyBasketPageCreator } from "./emptyBasketPage";
import { deleteAllProductFromBasket } from "./deleteAllProductFromBasket";
import { showBasketItems } from "./showBasketItems";

export async function createBasketPage() {
  const content = document.querySelector(".content") as HTMLDivElement;
  content.innerHTML = "";

  const costAndPromoWraper = document.createElement("div");
  costAndPromoWraper.classList.add("cost_promo_wraper");

  const totalCostWraper = document.createElement("div");
  totalCostWraper.classList.add("total_cost_wraper");
  const isEmptyBasket = await getTotalCost(totalCostWraper);

  await showBasketItems();

  const arrayOfCodes = await apiGetDiscountCodes();

  const discountWraper = document.createElement("div");
  discountWraper.classList.add("discont_wraper");
  const discontInput = document.createElement("input");
  discontInput.placeholder = "Input promo code";
  discontInput.classList.add("discont_input");
  const discontBtn = document.createElement("div");
  discontBtn.classList.add("discont_btn");
  discontBtn.classList.add("nav__item");
  discontBtn.innerHTML = "apply code";
  discontBtn.addEventListener("click", async () => {
    if (arrayOfCodes?.includes(discontInput.value)) {
      discontInput.classList.add("true_promo_code");
      discontInput.classList.remove("false_promo_code");
      const discoutnObj = await useDiscountCodeById(discontInput.value);
      await getTotalCost(totalCostWraper, discoutnObj);
    } else {
      discontInput.classList.remove("true_promo_code");
      discontInput.classList.add("false_promo_code");
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
  YesBtn.addEventListener("click", () => {
    deleteAllProductFromBasket();
    modalWindowWraper.style.display = "none";
  });

  discountWraper.append(discontInput, discontBtn);
  costAndPromoWraper.append(discountWraper, deleteAllBtn, totalCostWraper);
  content.append(costAndPromoWraper, modalWindowWraper);
  if (isEmptyBasket) {
    emptyBasketPageCreator();
  }
}
