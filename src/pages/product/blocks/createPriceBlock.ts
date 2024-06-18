import { Result } from "../../../helpers/interfaces/Results";
import { createElement } from "../../../helpers/creators/createElement";
import { getProductDiscountById } from "../../../apiRequests/getProductDiscountById";
import { apiAddProductToShoppingList } from "../../../apiRequests/shoppingList/apiAddProductToShoppingList";
import { getCustomerById } from "../../../apiRequests/getCustomerById";
import { apiGetShoppingList } from "../../../apiRequests/shoppingList/apiGetShoppingList";
import { apiDeleteProductToShoppingList } from "../../../apiRequests/shoppingList/apiDeleteProductToShoppingList";
import { createNotification } from "../../../notification/createNotificationElem";
import { checkBasket } from "../checkBasket";

export async function createPriceBlock(product: Result): Promise<HTMLElement> {
  const current = product.masterData.current;
  const user = localStorage.getItem("customerId");
  const customer = user ? await getCustomerById(user) : false;

  const priceBlock = createElement("div", "price-block");
  const pricesText = createElement("div", "prices");
  const price = createElement("span", "price", String(current.masterVariant.prices[0].value.centAmount / 100) + "$");
  const buttonSend = createElement("button", "login-btn-grad", "Add");
  buttonSend.addEventListener("click", async () => {
    await apiAddProductToShoppingList(product.id);
    console.log(
      `Корзина пользователя ${customer.firstName || "Anon"}, после добавления товара:`,
      await apiGetShoppingList(),
    );
    createNotification("success", " Product added to basket");
    checkBasket(product.id);
  });

  const buttonDelete = createElement("button", "login-btn-grad", "Delete");
  buttonDelete.addEventListener("click", async () => {
    await apiDeleteProductToShoppingList(product.id, true);
    createNotification("success", "Product removed from basket");
    console.log(
      `Корзина пользователя ${customer.firstName || "Anon"}, после удаления товара`,
      await apiGetShoppingList(),
    );
    checkBasket(product.id);
  });

  if (current.masterVariant.prices[0].discounted) {
    const discoundId = current.masterVariant.prices[0].discounted.discount.id;
    const discoundResult = await getProductDiscountById(discoundId);
    const discundDescription = createElement("span", "price__description", "(" + discoundResult.description.en + ")");

    const discoundPrice = createElement(
      "span",
      "price",
      String(current.masterVariant.prices[0].discounted.value.centAmount / 100) + "$",
    );
    discoundPrice.classList.add("price_discound");
    price.classList.add("price_irrelevant");

    pricesText.append(discoundPrice, price, discundDescription);
  } else {
    pricesText.append(price);
  }
  priceBlock.append(pricesText, buttonSend, buttonDelete);

  return priceBlock;
}
