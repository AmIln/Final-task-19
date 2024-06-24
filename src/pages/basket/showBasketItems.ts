import { apiGetProductById } from "../../apiRequests/apiGetProductById";
import { updateBasketItems } from "./updateBasketItems";
import { removeBasketItem } from "./removeBasketItem";
import { removeLineItemToCart } from "../../apiRequests/shoppingList/removeLineItemToCart";
import { getCart } from "../../apiRequests/shoppingList/getCart";
import { createElement } from "../../helpers/creators/createElement";
import { createImage } from "../../helpers/creators/createImage";

async function getProductDetails(productId: string) {
  const product = await apiGetProductById(productId);
  return product ? product.masterData.current : null;
}

export async function showBasketItems() {
  const content = document.querySelector(".content") as HTMLDivElement;

  const cartList = await getCart();

  if (!cartList) {
    content.innerHTML = "Your basket is empty.";
    return;
  }

  const itemsContainer = createElement("div", "items_container");

  for (const lineItem of cartList.lineItems) {
    const productDetails = await getProductDetails(lineItem.productId);

    if (productDetails) {
      const itemWrapper = createElement("div", "item_wrapper");

      const itemImage = createImage(
        "item_image",
        productDetails.masterVariant.images[0].url,
        productDetails.masterVariant.key,
        150,
        150,
      );

      const itemName = createElement("div", "item_name", productDetails.name.en);
      const itemPrice = createElement("div", "item_price");

      const price = productDetails.masterVariant.prices[0].value.centAmount / 100;
      const discountPrice = productDetails.masterVariant.prices[0].discounted?.value.centAmount;

      let totalPriceForItem = 0;

      if (discountPrice) {
        itemPrice.innerHTML = `Discounted Price: $${discountPrice / 100},  <span class="original-price"> Original Price: $${price}</span>`;
        itemPrice.id = discountPrice / 100 + "";
        totalPriceForItem = (discountPrice / 100) * lineItem.quantity;
      } else {
        itemPrice.innerHTML = `Price: $${price}`;
        itemPrice.id = price + "";
        totalPriceForItem = price * lineItem.quantity;
      }

      const minusButton = createElement("button", "login-btn-grad", "-");
      minusButton.classList.add("quantity-btn", "minus-btn");
      const plusButton = createElement("button", "login-btn-grad", "+");
      plusButton.classList.add("quantity-btn", "plus-btn");
      const quantityValue = createElement("span", "product-counter", String(lineItem.quantity));

      const itemQuantity = createElement("div", "item_quantity", "", lineItem.productId);
      itemQuantity.append(minusButton, quantityValue, plusButton);

      const itemTotalPrice = createElement("div", "item_total_price", `Total: $${totalPriceForItem.toFixed(2)}`);

      const deleteButton = createElement("button", "login-btn-grad", "Delete");
      deleteButton.classList.add("delete-item");

      deleteButton.addEventListener("click", async () => {
        await removeLineItemToCart(lineItem.productId);
      });

      itemWrapper.append(itemImage, itemName, itemPrice, itemQuantity, itemTotalPrice, deleteButton);
      itemsContainer.appendChild(itemWrapper);
    }
  }

  content.appendChild(itemsContainer);

  updateBasketItems();
  removeBasketItem();
}
