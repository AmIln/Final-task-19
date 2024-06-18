import { apiDeleteProductToShoppingList } from "../../apiRequests/shoppingList/apiDeleteProductToShoppingList";
import { createNotification } from "../../notification/createNotificationElem";
import { emptyBasketPageCreator } from "./emptyBasketPage";
import { getTotalCost } from "./getTotalCost";

async function deleteCartItem(productId: string, itemWrapper: HTMLElement) {
  try {
    await apiDeleteProductToShoppingList(productId, true);
    createNotification("success", "Item Removed");
    itemWrapper.remove();
    document.querySelector(".items_container")?.innerHTML === "" ? emptyBasketPageCreator() : "";
  } catch (error) {
    createNotification("error", "Remove failed. Try again.");
    const deleteBtn = itemWrapper.querySelector(".login-btn-grad.delete-item") as HTMLButtonElement;
    const minusButton = itemWrapper.querySelector(".minus-btn") as HTMLButtonElement;
    const plusButton = itemWrapper.querySelector(".plus-btn") as HTMLButtonElement;
    deleteBtn.removeAttribute("disabled");
    minusButton.removeAttribute("disabled");
    plusButton.removeAttribute("disabled");
  }
}

export function removeBasketItem() {
  const deleteBtns = document.querySelectorAll<HTMLElement>(".login-btn-grad.delete-item");
  deleteBtns.forEach((deleteButton) => {
    deleteButton.addEventListener("click", async () => {
      deleteButton.setAttribute("disabled", "true");

      const itemWrapper = deleteButton.closest(".item_wrapper") as HTMLElement;
      const productId = itemWrapper.querySelector(".item_quantity")?.id;

      if (!productId) return;

      await deleteCartItem(productId, itemWrapper);
      const minusButton = itemWrapper.querySelector(".minus-btn") as HTMLButtonElement;
      const plusButton = itemWrapper.querySelector(".plus-btn") as HTMLButtonElement;
      minusButton.setAttribute("disabled", "true");
      plusButton.setAttribute("disabled", "true");
      await getTotalCost(document.querySelector(".total_cost_wraper") as HTMLElement);
    });
  });
}
