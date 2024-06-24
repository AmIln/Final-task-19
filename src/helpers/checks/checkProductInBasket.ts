import { getCart } from "../../apiRequests/shoppingList/getCart";

export async function checkProductInBasket(idProduct: string): Promise<string> {
  let quantity = "0";
  const cartList = await getCart();
  if (!cartList) return quantity;
  cartList.lineItems.forEach((list) => {
    if (list.productId === idProduct) {
      quantity = String(list.quantity);
    }
  });

  return quantity;
}
