import { getProjectHost } from "../../../helpers/getsAPI";
import { getCart } from "../getCart";

export async function removeDiscoundCodeToCart(): Promise<void> {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);
  const host = getProjectHost();

  const cart = await getCart();
  if (!cart) return;
  const discouindCodes = cart.discountCodes;
  if (!discouindCodes) return;

  // удаляем все имеющиеся промокоды у корзины
  for (const code of discouindCodes) {
    const cartNew = await getCart();
    if (!cartNew) return;

    const raw = JSON.stringify({
      version: cartNew.version,
      actions: [
        {
          action: "removeDiscountCode",
          discountCode: code.discountCode,
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as const,
    };

    try {
      const response = await fetch(`${host}/carts/${cart.id}`, requestOptions);
      const result = await response.text();
      const json = JSON.parse(result);

      return json;
    } catch (error) {
      console.log(error);
    }
  }
}
