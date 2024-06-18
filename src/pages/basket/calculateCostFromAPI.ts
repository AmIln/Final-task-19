import { ShoppingList } from "../../helpers/interfaces/ShoppingList";
import { apiGetProductById } from "../../apiRequests/apiGetProductById";

export async function calculateTotalCost(list: ShoppingList) {
  let totalCost = 0;
  for (let i = 0; i < list.lineItems.length; i++) {
    const product = await apiGetProductById(list.lineItems[i].productId);
    if (product?.masterData.current.masterVariant.prices[0].discounted && i === list.lineItems.length - 1) {
      totalCost +=
        product?.masterData.current.masterVariant.prices[0].discounted.value.centAmount * list.lineItems[i].quantity;
      return totalCost;
    } else if (product?.masterData.current.masterVariant.prices[0].discounted) {
      totalCost +=
        product?.masterData.current.masterVariant.prices[0].discounted.value.centAmount * list.lineItems[i].quantity;
    } else if (product && i === list.lineItems.length - 1) {
      totalCost += product.masterData.current.masterVariant.prices[0].value.centAmount * list.lineItems[i].quantity;
      return totalCost;
    } else if (product) {
      totalCost += product.masterData.current.masterVariant.prices[0].value.centAmount * list.lineItems[i].quantity;
    }
  }
  return 1;
}
