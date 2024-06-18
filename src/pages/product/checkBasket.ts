import { apiGetShoppingList } from "../../apiRequests/shoppingList/apiGetShoppingList";

export async function checkBasket(productId: string) {
  const parentElem = document.querySelector(".price-block") as HTMLElement;
  const buttons = parentElem.querySelectorAll<HTMLButtonElement>("button");
  try {
    const productList = await apiGetShoppingList();
    window.scrollTo(0, 0);
    if (productList) {
      const foundProduct = productList.lineItems.find((product) => product.productId === productId);
      if (foundProduct) {
        buttons[0].removeAttribute("disabled");
        buttons[1].removeAttribute("disabled");
        buttons[0].setAttribute("disabled", "true");
      } else {
        buttons[1].removeAttribute("disabled");
        buttons[0].removeAttribute("disabled");
        buttons[1].setAttribute("disabled", "true");
      }
    }
  } catch (error) {
    console.error("error", error);
  }
}
