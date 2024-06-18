import { Discontobj } from "../../helpers/interfaces/discountObj";
import { ShoppingList } from "../../helpers/interfaces/ShoppingList";
import { apiGetProductById } from "../../apiRequests/apiGetProductById";
//import { calculateTotalCost } from "./calculateCostFromAPI";

export async function UseTotalPricePromo(
  oldCost: number,
  discontobj: Discontobj,
  list: false | ShoppingList,
  newCostWraper: HTMLElement,
) {
  let newCost = oldCost / 100;

  //скидка на всю корзину
  if (discontobj.target.type === "totalPrice") {
    if (discontobj && discontobj.value.type === "relative") {
      newCost = Math.round((oldCost / 100) * (100 - discontobj.value.permyriad / 100)) / 100;
    } else if (discontobj && discontobj.value.type === "absolute") {
      newCost = oldCost / 100 - discontobj.value.money[0].centAmount / 100;
    }
    newCostWraper.innerHTML = `${Math.round(newCost * 100) / 100} $ `;
    //скидка на категорию
  } else if (discontobj.target.type === "lineItems" && list && discontobj.target.predicate.includes("categories.id")) {
    const categoryId = discontobj.references[0].id;
    list.lineItems.forEach(async (item) => {
      const product = await apiGetProductById(item.productId);
      let isPromoProduct = false;
      if (product) {
        for (let i = 0; i < product.masterData.current.categories.length; i++) {
          if (product.masterData.current.categories[i].id === categoryId) {
            isPromoProduct = true;
          }
        }
      }
      //рассчет стоимость после промо кода
      if (isPromoProduct) {
        if (
          product?.masterData.current.masterVariant.prices[0].discounted &&
          discontobj &&
          discontobj.value.type === "relative"
        ) {
          newCost -=
            (product?.masterData.current.masterVariant.prices[0].discounted.value.centAmount *
              item.quantity *
              (discontobj.value.permyriad / 100)) /
            10000;
        } else if (
          product?.masterData.current.masterVariant.prices[0].discounted &&
          discontobj &&
          discontobj.value.type === "absolute"
        ) {
          newCost -= (discontobj.value.money[0].centAmount * item.quantity) / 100;
        } else if (product && discontobj && discontobj.value.type === "relative") {
          newCost -=
            (product.masterData.current.masterVariant.prices[0].value.centAmount *
              item.quantity *
              (discontobj.value.permyriad / 100)) /
            10000;
        } else if (product && discontobj && discontobj.value.type === "absolute") {
          newCost -= (discontobj.value.money[0].centAmount * item.quantity) / 100;
        }
      }
      newCostWraper.innerHTML = `${Math.round(newCost * 100) / 100} $ `;
    });
    //скидка на продукт
  } else if (discontobj.target.type === "lineItems" && list && discontobj.target.predicate.includes("product.id")) {
    const ProductId = discontobj.references[0].id;
    list.lineItems.forEach(async (item) => {
      if (item.productId === ProductId) {
        const product = await apiGetProductById(ProductId);
        if (
          product?.masterData.current.masterVariant.prices[0].discounted &&
          discontobj &&
          discontobj.value.type === "relative"
        ) {
          newCost -=
            (product?.masterData.current.masterVariant.prices[0].discounted.value.centAmount *
              item.quantity *
              (discontobj.value.permyriad / 100)) /
            10000;
        } else if (
          product?.masterData.current.masterVariant.prices[0].discounted &&
          discontobj &&
          discontobj.value.type === "absolute"
        ) {
          newCost -= (discontobj.value.money[0].centAmount * item.quantity) / 100;
        } else if (product && discontobj && discontobj.value.type === "relative") {
          newCost -=
            (product.masterData.current.masterVariant.prices[0].value.centAmount *
              item.quantity *
              (discontobj.value.permyriad / 100)) /
            10000;
        } else if (product && discontobj && discontobj.value.type === "absolute") {
          newCost -= (discontobj.value.money[0].centAmount * item.quantity) / 100;
        }
        newCostWraper.innerHTML = `${Math.round(newCost * 100) / 100} $ `;
      }
      if (newCostWraper.innerHTML === "") newCostWraper.innerHTML = `${Math.round(newCost * 100) / 100} $ `;
    });
  }
  return newCost;
}
//ff8fe10a-745c-4f71-a11f-974daffbb8b8
//b7c045ce-e6f9-4861-88d3-99573377daa6
//4cc46b84-f1ab-4ba9-b7d7-7303dc629756
//b7e6f313-d94c-409c-83c2-4aab65caa827
