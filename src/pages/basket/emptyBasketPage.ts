import { getCart } from "../../apiRequests/shoppingList/getCart";
import { createElement } from "../../helpers/creators/createElement";
import { route } from "../../router/route";

export function emptyBasketPageCreator() {
  const content = document.querySelector(".content") as HTMLDivElement;
  content.innerHTML = "";

  const messageWraper = createElement("div", "empty_basket_message_wraper");
  const mainText = createElement("div", "empty_basket_main_text", "Your bag is empty");
  const secondText = createElement("div", "empty_basket_second_text", "Start shopping for awesome gifts");

  const button = createElement("div", "button_to_cataloge_page", "Go to catalog page");
  button.classList.add("nav__item");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    route("");
  });

  messageWraper.append(mainText, secondText, button);
  content.append(messageWraper);
}

export async function isEmptyBasket(): Promise<boolean> {
  const cart = await getCart();

  if (cart && cart.lineItems.length > 0) {
    return false;
  }

  return true;
}
