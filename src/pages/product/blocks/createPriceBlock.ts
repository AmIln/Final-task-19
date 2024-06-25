import { Result } from "../../../helpers/interfaces/Results";
import { createElement } from "../../../helpers/creators/createElement";
import { getProductDiscountById } from "../../../apiRequests/getProductDiscountById";
import { createBuyBlock } from "../../../helpers/creators/productCard/createBuyBlock";

export async function createPriceBlock(product: Result): Promise<HTMLElement> {
  const current = product.masterData.current;

  const priceBlock = createElement("div", "price-block");
  const pricesText = createElement("div", "prices");
  const price = createElement("span", "price", String(current.masterVariant.prices[0].value.centAmount / 100) + "$");

  const buyBlock = await createBuyBlock(product.id);

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

  priceBlock.append(pricesText, buyBlock);

  return priceBlock;
}
