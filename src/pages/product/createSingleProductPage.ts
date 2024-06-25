import { Result } from "../../helpers/interfaces/Results";
import { createCategoriesBlock } from "./blocks/createCategoriesBlock";
import { createPriceBlock } from "./blocks/createPriceBlock";
import { createSlider } from "./slider/createSlider";
import { changeSlide } from "./slider/changeSlide";
import { createProductDescr } from "./productDescr/createProductDescr";
import { openSliderModal } from "./sliderModal/openSliderModal";
import { createSliderModal } from "./sliderModal/createSliderModal";
import "./singleProductPage.module.scss";
import { createElement } from "../../helpers/creators/createElement";

export async function createSingleProductPage(product: Result): Promise<void> {
  const content = document.querySelector(".content") as HTMLDivElement;
  content.innerHTML = "";

  const productPage = createElement("div", "productPage");
  const productPageWrapper = createElement("div", "productPageWrapper");

  const slider = createSlider(product.masterData.current.masterVariant.images);
  const description = createProductDescr(product);
  productPageWrapper.append(slider, description);

  const categoriesBlock = createCategoriesBlock(product);
  const priceBlock = await createPriceBlock(product);

  productPage.append(categoriesBlock, productPageWrapper, priceBlock);
  const sliderModal = createSlider(product.masterData.current.masterVariant.images);
  content.append(productPage);
  changeSlide();
  createSliderModal(sliderModal);
  openSliderModal();
}
