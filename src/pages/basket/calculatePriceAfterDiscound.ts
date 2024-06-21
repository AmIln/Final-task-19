import { Cart, LineItem } from "@commercetools/platform-sdk";
import { Promotion } from "../../helpers/interfaces/Promotion";

export async function calculatePriceAfterDiscound(price: number, discound: Promotion, cart: Cart): Promise<number> {
  let newPrice = price;
  if (discound.target.type === "totalPrice") {
    newPrice = discound.value.money ? price - discound.value.money[0].centAmount : subtractPercentage(price, discound);
  }
  if (discound.target.type === "lineItems") {
    newPrice = 0;

    for (const product of cart.lineItems) {
      if (discound.target.predicate) {
        if (checkPredicate(product, discound.target.predicate)) {
          newPrice += discound.value.money
            ? product.totalPrice.centAmount - discound.value.money[0].centAmount
            : subtractPercentage(product.totalPrice.centAmount, discound);
        } else {
          newPrice += product.totalPrice.centAmount;
        }
      }
    }
  }

  return newPrice / 100;
}

function subtractPercentage(number: number, discound: Promotion) {
  const percentage = Number(discound.value.permyriad) / 100;

  const percentageAmount = (number * percentage) / 100;

  const result = number - percentageAmount;
  return result;
}

function checkPredicate(product: LineItem, predicate: string) {
  const currentPredicate = predicate.split(" ")[0];

  const attributeName = currentPredicate.split(".")[1];

  if (!product.variant.attributes) return false;

  for (const attribute of product.variant.attributes) {
    if (attribute.name === attributeName && attribute.value === true) {
      return true;
    }
  }

  return false;
}
