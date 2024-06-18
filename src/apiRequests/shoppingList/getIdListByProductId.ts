import { LineItem } from "../../helpers/interfaces/LineItem";
import { ShoppingList } from "../../helpers/interfaces/ShoppingList";

export async function getIdListByProductId(productId: string, shoppingList: ShoppingList): Promise<LineItem | boolean> {
  const lineItems = shoppingList.lineItems as LineItem[];
  let result;

  lineItems.forEach((line) => {
    if (line.productId === productId) {
      result = line;
    }
  });
  return result || false;
}
