import { createNotification } from "../../notification/createNotificationElem";

export async function promocodeDoesNotWork(wrapper: HTMLElement, price: number): Promise<void> {
  console.log("promocodeDoesNotWork");
  wrapper.innerHTML = `The total cost is: ${Math.round(price) / 100} $`;
  createNotification("info", "Promo code does not match your cart");
  const discontInput = document.getElementById("discont_input") as HTMLInputElement;
  discontInput.classList.remove("true_promo_code");
  discontInput.classList.add("false_promo_code");
}
