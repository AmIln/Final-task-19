import { route } from "../../router/route";

export function emptyBasketPageCreator() {
  const content = document.querySelector(".content") as HTMLDivElement;
  content.innerHTML = "";

  const messageWraper = document.createElement("div");
  messageWraper.classList.add("empty_basket_message_wraper");

  const mainText = document.createElement("div");
  mainText.innerHTML = `Your bag is empty`;
  mainText.classList.add("empty_basket_main_text");

  const secondText = document.createElement("div");
  secondText.classList.add("empty_basket_second_text");
  secondText.innerHTML = `Start shopping for awesome gifts`;

  const button = document.createElement("div");
  button.classList.add("button_to_cataloge_page", "nav__item");
  button.innerHTML = `Go to catalog page`;
  button.addEventListener("click", (event) => {
    event.preventDefault();
    route("");
  });

  messageWraper.append(mainText, secondText, button);
  content.append(messageWraper);
}
