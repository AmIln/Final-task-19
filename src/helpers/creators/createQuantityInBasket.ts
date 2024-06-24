import { getCart } from "../../apiRequests/shoppingList/getCart";

export async function createQualityInBasket() {
  const qualityWraper = document.querySelector(".count_product_wraper") as HTMLElement;
  const cartList = await getCart();
  if (cartList && cartList.lineItems) {
    qualityWraper.innerHTML = `${cartList.lineItems.length}`;
  }
}
