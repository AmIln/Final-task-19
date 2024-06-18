import { apiAddProductToShoppingList } from "../../apiRequests/shoppingList/apiAddProductToShoppingList";
import { apiDeleteProductToShoppingList } from "../../apiRequests/shoppingList/apiDeleteProductToShoppingList";
import { apiGetShoppingList } from "../../apiRequests/shoppingList/apiGetShoppingList";
import { createNotification } from "../../notification/createNotificationElem";
import { emptyBasketPageCreator } from "./emptyBasketPage";
import { getTotalCost } from "./getTotalCost";

async function updateItem(idProduct: string, quantityChange: number, itemWrapper: HTMLElement) {
  const minusButton = itemWrapper.querySelector(".minus-btn") as HTMLElement;
  const plusButton = itemWrapper.querySelector(".plus-btn") as HTMLElement;
  const quantityValue = itemWrapper.querySelector(".item_quantity span") as HTMLElement;
  const itemTotalPrice = itemWrapper.querySelector(".item_total_price") as HTMLElement;
  const itemPrice = itemWrapper.querySelector(".item_price") as HTMLElement;
  const deleteBtn = itemWrapper.querySelector(".login-btn-grad.delete-item") as HTMLButtonElement;
  const totalCostWraper = document.querySelector(".total_cost_wraper") as HTMLElement;

  minusButton.setAttribute("disabled", "true");
  plusButton.setAttribute("disabled", "true");
  deleteBtn.setAttribute("disabled", "true");

  const shoppingList = await apiGetShoppingList();
  if (!shoppingList) {
    console.log("Shopping list is empty.");
    minusButton.removeAttribute("disabled");
    plusButton.removeAttribute("disabled");
    return;
  }

  const lineItem = shoppingList.lineItems.find((item) => item.productId === idProduct);

  if (!lineItem) {
    console.log("Item not found in the shopping list.");
    minusButton.removeAttribute("disabled");
    plusButton.removeAttribute("disabled");
    deleteBtn.removeAttribute("disabled");
    return;
  }

  const newQuantity = lineItem.quantity + quantityChange;

  try {
    if (quantityChange > 0) {
      await apiAddProductToShoppingList(idProduct);
    } else {
      await apiDeleteProductToShoppingList(idProduct);
    }

    quantityValue.textContent = newQuantity.toString();
    const price = itemPrice.id;
    const totalPriceChange = +price * quantityChange;
    const currentTotalPrice = parseFloat(itemTotalPrice.textContent!.replace("Total: $", ""));
    const newTotalPrice = (currentTotalPrice + totalPriceChange).toFixed(2);

    itemTotalPrice.textContent = `Total: $${newTotalPrice}`;

    minusButton.removeAttribute("disabled");
    plusButton.removeAttribute("disabled");
    deleteBtn.removeAttribute("disabled");

    if (newQuantity <= 0) {
      itemWrapper.remove();
      document.querySelector(".items_container")?.innerHTML === "" ? emptyBasketPageCreator() : "";
    }
    await getTotalCost(totalCostWraper);
  } catch (error) {
    console.error("Basket update error:", error);
    createNotification("error", "Basket update error");
    minusButton.removeAttribute("disabled");
    plusButton.removeAttribute("disabled");
  }
}

export async function updateBasketItems() {
  const quantitys = document.querySelectorAll<HTMLElement>(".item_quantity");

  quantitys.forEach((quantity) => {
    const itemWrapper = quantity.closest(".item_wrapper") as HTMLElement;

    const minusButton = quantity.querySelector(".minus-btn") as HTMLElement;
    const plusButton = quantity.querySelector(".plus-btn") as HTMLElement;
    const quantityValue = quantity.querySelector("span") as HTMLElement;
    const itemTotalPrice = quantity.nextElementSibling as HTMLElement;

    if (minusButton && plusButton && quantityValue && itemTotalPrice) {
      minusButton.addEventListener("click", async () => {
        const productId = quantity.id;
        if (!productId) return;
        await updateItem(productId, -1, itemWrapper);
      });

      plusButton.addEventListener("click", async () => {
        const productId = quantity.id;
        if (!productId) return;
        await updateItem(productId, +1, itemWrapper);
      });
    }
  });
}
// реализовать пункт RSS-ECOMM-4_23
// настроить кнопку to Basket на главной странице
