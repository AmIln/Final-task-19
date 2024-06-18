import { apiAddProductToShoppingList } from "../../../apiRequests/shoppingList/apiAddProductToShoppingList";
import { apiDeleteProductToShoppingList } from "../../../apiRequests/shoppingList/apiDeleteProductToShoppingList";
import { buyLoading, buyLoadingOff, buyLoadingOn } from "../../../modules/loading/buyLoading";
import { checkProductInBasket } from "../../checks/checkProductInBasket";
import { createElement } from "../createElement";
import { createLink } from "../createLink";
import { createQualityInBasket } from "../../creators/createQuantityInBasket";

export async function createBuyBlock(idProduct: string): Promise<HTMLElement> {
  const buyBlock = createElement("div", "buy-block");
  const buyButton = createElement("button", "button__buy", "buy");
  const basketButton = createLink("button__basket", "#basket", false);
  basketButton.textContent = "to basket";
  basketButton.classList.add("button_disable");
  const counterWrapper = createElement("div", "counter-buttons-wrapper");
  const minusButton = createElement("div", "button__delete", "-");
  minusButton.classList.add("button_disable");
  const plusButton = createElement("div", "button__add", "+");
  plusButton.classList.add("button_disable");
  const countProduct = createElement("span", "product-count");
  countProduct.classList.add("button_disable");
  countProduct.textContent = await checkProductInBasket(idProduct);
  const counterBlock = createElement("div", "counter-block");

  buyLoading(counterWrapper);
  counterWrapper.append(minusButton, countProduct, plusButton);
  counterBlock.append(basketButton, counterWrapper);
  buyBlock.append(buyButton, counterBlock);

  const arrayButtons = [basketButton, minusButton, plusButton, countProduct];

  if (countProduct.textContent != "0") {
    showButtons(buyButton, arrayButtons);
  }

  buyButton.addEventListener("click", async (event: Event) => {
    const element = event.target as HTMLButtonElement;
    element?.setAttribute("disabled", "true");
    event.preventDefault();
    await apiAddProductToShoppingList(idProduct);
    countProduct.textContent = await checkProductInBasket(idProduct);
    createQualityInBasket();
    showButtons(buyButton, arrayButtons);
  });
  plusButton.addEventListener("click", async () => {
    buyLoadingOn(counterWrapper);
    await apiAddProductToShoppingList(idProduct);
    countProduct.textContent = await checkProductInBasket(idProduct);
    buyLoadingOff(counterWrapper);
  });
  minusButton.addEventListener("click", async () => {
    buyLoadingOn(counterWrapper);
    await apiDeleteProductToShoppingList(idProduct);
    countProduct.textContent = await checkProductInBasket(idProduct);
    if (countProduct.textContent === "0") {
      disableButtons(buyButton, arrayButtons);
      createQualityInBasket();
    }
    buyLoadingOff(counterWrapper);
  });

  return buyBlock;
}

function showButtons(buy: HTMLElement, array: HTMLElement[]) {
  buy.classList.add("button_disable");
  buy.removeAttribute("disabled");
  array.forEach((element) => {
    element.classList.remove("button_disable");
  });
}

function disableButtons(buy: HTMLElement, array: HTMLElement[]) {
  buy.classList.remove("button_disable");
  array.forEach((element) => {
    element.classList.add("button_disable");
  });
}
