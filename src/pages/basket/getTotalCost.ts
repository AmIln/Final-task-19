import { apiGetShoppingList } from "../../apiRequests/shoppingList/apiGetShoppingList";
import { Discontobj } from "../../helpers/interfaces/discountObj";
import { UseTotalPricePromo } from "./calculateCostWithPromo";
import { calculateTotalCost } from "./calculateCostFromAPI";
import { createQualityInBasket } from "../../helpers/creators/createQuantityInBasket";
require("./basketPage.scss");

export async function getTotalCost(wraper: HTMLElement, discontobj?: Discontobj) {
  const list = await apiGetShoppingList();
  let totalCost = 0;
  if (list) totalCost = await calculateTotalCost(list);
  if (typeof list !== "boolean") {
    if (!list.lineItems.length) {
      return true;
    }
  }
  wraper.innerHTML = `The total cost is: ${Math.round(totalCost) / 100} $`;

  if (discontobj) {
    wraper.innerHTML = ``;
    const costText = document.createElement("span");
    costText.innerHTML = `The total cost is: `;
    const newCost = document.createElement("span");
    newCost.classList.add("valid_total_cost");
    const oldCost = document.createElement("span");
    oldCost.classList.add("invalid_total_cost");
    oldCost.innerHTML = `${Math.round(totalCost) / 100} $`;

    wraper.append(costText, newCost, oldCost);
    await UseTotalPricePromo(totalCost, discontobj, list, newCost);
  } else {
    createQualityInBasket();
  }
  return false;
}
