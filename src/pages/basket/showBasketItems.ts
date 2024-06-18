import { apiGetShoppingList } from "../../apiRequests/shoppingList/apiGetShoppingList";
import { apiGetProductById } from "../../apiRequests/apiGetProductById";
import { updateBasketItems } from "./updateBasketItems";
import { removeBasketItem } from "./removeBasketItem";

async function getProductDetails(productId: string) {
  const product = await apiGetProductById(productId);
  return product ? product.masterData.current : null;
}

export async function showBasketItems() {
  const content = document.querySelector(".content") as HTMLDivElement;
  content.innerHTML = "";

  const shoppingList = await apiGetShoppingList();

  if (!shoppingList) {
    content.innerHTML = "Your basket is empty.";
    return;
  }

  const itemsContainer = document.createElement("div");
  itemsContainer.classList.add("items_container");

  for (const lineItem of shoppingList.lineItems) {
    const productDetails = await getProductDetails(lineItem.productId);

    if (productDetails) {
      const itemWrapper = document.createElement("div");
      itemWrapper.classList.add("item_wrapper");

      const itemImage = document.createElement("img");
      itemImage.classList.add("item_image");
      itemImage.src = productDetails.masterVariant.images[0].url;

      const itemName = document.createElement("div");
      itemName.classList.add("item_name");
      itemName.innerHTML = productDetails.name.en;

      const itemPrice = document.createElement("div");
      itemPrice.classList.add("item_price");

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

      const itemQuantity = document.createElement("div");
      itemQuantity.classList.add("item_quantity");
      itemQuantity.id = lineItem.productId;

      const minusButton = document.createElement("button");
      minusButton.textContent = "-";
      minusButton.classList.add("login-btn-grad", "quantity-btn", "minus-btn");
      const plusButton = document.createElement("button");
      plusButton.classList.add("login-btn-grad", "quantity-btn", "plus-btn");
      plusButton.textContent = "+";
      const quantityValue = document.createElement("span");
      quantityValue.textContent = lineItem.quantity + "";
      itemQuantity.append(minusButton, quantityValue, plusButton);

      const itemTotalPrice = document.createElement("div");
      itemTotalPrice.classList.add("item_total_price");
      itemTotalPrice.innerHTML = `Total: $${totalPriceForItem.toFixed(2)}`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("login-btn-grad", "delete-item");

      itemWrapper.append(itemImage, itemName, itemPrice, itemQuantity, itemTotalPrice, deleteButton);
      itemsContainer.appendChild(itemWrapper);
    }
  }

  content.appendChild(itemsContainer);

  updateBasketItems();
  removeBasketItem();
}
