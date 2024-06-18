import { Current } from "../../interfaces/Current";
import { Result } from "../../interfaces/Results";
import { createElement } from "../createElement";
import { createImage } from "../createImage";
import { route } from "../../../router/route";
import { createBuyBlock } from "./createBuyBlock";

const styles = require("./content.module.scss");

export async function createCard(product: Result): Promise<HTMLElement> {
  const current: Current = product.masterData.current;
  const cardLink = document.createElement("a");
  cardLink.classList.add("card-link");
  cardLink.href = `#${product.masterData.current.slug.en}`;
  cardLink.id = `${product.id}`;

  const cardBody = createElement("div", styles.card);

  cardLink.append(cardBody);

  const cardImage = createImage(
    styles.card__image,
    current.masterVariant.images[0].url,
    current.masterVariant.sku,
    current.masterVariant.images[0].dimensions.w,
    current.masterVariant.images[0].dimensions.h,
  );
  const cardDescr = createElement("div", styles.card__description);
  const nameEN = current.name.en;
  const cardNameEN = createElement("span", styles.card__name, nameEN);
  const price = current.masterVariant.prices[0].value.centAmount / 100;
  const discountPrice = current.masterVariant.prices[0].discounted?.value.centAmount;
  const cardPrice = createElement("span", styles.card__price, `${price}$`);

  const priceBlock = createElement("div", "price-block");
  cardDescr.append(priceBlock);

  if (discountPrice) {
    const cardDiscound = createElement("span", styles.card__discound, `${discountPrice / 100}$`);
    cardPrice.classList.add(styles.card__price_inactive);

    priceBlock.append(cardDiscound, cardPrice);
    cardDescr.append(priceBlock, cardNameEN);
  } else {
    priceBlock.append(cardPrice);
    cardDescr.append(priceBlock, cardNameEN);
  }

  const buyBlock = await createBuyBlock(product.id);

  cardLink.addEventListener("click", (event: Event) => {
    event.preventDefault();

    const ignoredButtons = Array.from(buyBlock.querySelectorAll("*"));
    // если клик не по кнопке купить/и не блок с кнопками
    if (!ignoredButtons.includes(event.target as HTMLElement)) {
      route(cardLink.href, cardLink.id);
    }
  });
  cardDescr.append(buyBlock);
  cardBody.append(cardImage, cardDescr);
  return cardLink;
}
