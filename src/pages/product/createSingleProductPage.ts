import { Result } from "../../helpers/interfaces/Results";
import { createCategoriesBlock } from "./blocks/createCategoriesBlock";
import { createPriceBlock } from "./blocks/createPriceBlock";
import { createSlider } from "./slider/createSlider";
import { changeSlide } from "./slider/changeSlide";
import { createProductDescr } from "./productDescr/createProductDescr";
import { openSliderModal } from "./sliderModal/openSliderModal";
import { createSliderModal } from "./sliderModal/createSliderModal";
import "./singleProductPage.module.scss";
import { checkBasket } from "./checkBasket";

export async function createSingleProductPage(product: Result): Promise<void> {
  const content = document.querySelector(".content") as HTMLDivElement;
  content.innerHTML = "";

  const productPage: HTMLDivElement = document.createElement("div");
  productPage.className = "productPage";
  productPage.id = product.id;

  const productPageWrapper: HTMLDivElement = document.createElement("div");
  productPageWrapper.className = "productPageWrapper";

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
  checkBasket(product.id);
}
