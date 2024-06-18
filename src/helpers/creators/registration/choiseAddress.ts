import { createElement } from "../createElement";
import { createInput } from "../createInput";

export function choiseAddress(): HTMLElement {
  const shippingInput = createInput("checkbox", "defaulth-shipping", "defaulth-shipping", "defaulth-shipping", false);
  shippingInput.checked = true;
  const shippingText = createElement("span", "checkbox-text", "use default shipping address?");
  const defaulthShipping = createElement("div", "checkbox-wrapper");
  defaulthShipping.append(shippingText, shippingInput);

  const billingInput = createInput("checkbox", "defaulth-billing", "defaulth-billing", "defaulth-billing", false);
  billingInput.checked = true;
  const billingText = createElement("span", "checkbox-text", "use default billing address?");
  const defaulthBilling = createElement("div", "checkbox-wrapper");
  defaulthBilling.append(billingText, billingInput);

  const oneAddressInput = createInput("checkbox", "one-address", "one-address", "one-address", false);
  oneAddressInput.checked = true;
  const oneAddressText = createElement("span", "checkbox-text", "use one address for billing and shipping?");
  const oneAddress = createElement("div", "checkbox-wrapper");
  oneAddress.append(oneAddressText, oneAddressInput);

  const choiseAdress = createElement("div", "choises");
  choiseAdress.classList.add("adress");
  choiseAdress.append(defaulthShipping, defaulthBilling, oneAddress);
  return choiseAdress;
}
