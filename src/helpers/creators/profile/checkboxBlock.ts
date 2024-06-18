import { getCustomerById } from "../../../apiRequests/getCustomerById";
import { createElement } from "../createElement";
import { createInput } from "../createInput";

export async function checkboxBlock(customerId: string, addressId: string): Promise<HTMLElement> {
  const customer = await getCustomerById(customerId);
  const shippingAddresses: [string] = customer.shippingAddressIds;
  const billingAddresses: [string] = customer.billingAddressIds;

  const checkboxWrapper = createElement("div", "profile-inform__checkboxes");
  const checkboxShipping = createInput("checkbox", "profile-inform__checkbox", "checkbox-shipping", "", false);
  shippingAddresses.includes(addressId) ? (checkboxShipping.checked = true) : (checkboxShipping.checked = false);
  checkboxShipping.disabled = true;
  // выключение дефолтного, выключает обычный
  checkboxShipping.addEventListener("change", () => {
    if (!checkboxShipping.checked) {
      checkboxShippingDefaulth.checked = checkboxShipping.checked;
    }
  });
  const shippingText = createElement("span", "checkbox-text", "use as shipping address");
  const shippingGroup = createElement("div", "checkbox-group");
  shippingGroup.append(shippingText, checkboxShipping);

  const checkboxBilling = createInput("checkbox", "profile-inform__checkbox", "checkbox-billing", "", false);
  billingAddresses.includes(addressId) ? (checkboxBilling.checked = true) : (checkboxBilling.checked = false);
  checkboxBilling.disabled = true;
  // выключение дефолтного, выключает обычный
  checkboxBilling.addEventListener("change", () => {
    if (!checkboxBilling.checked) {
      checkboxBillingDefaulth.checked = checkboxBilling.checked;
    }
  });
  const billingText = createElement("span", "checkbox-text", "use as billing address");
  const billingGroup = createElement("div", "checkbox-group");
  billingGroup.append(billingText, checkboxBilling);

  const checkboxBillingDefaulth = createInput(
    "checkbox",
    "profile-inform__checkbox",
    "checkbox-billingDefaulth",
    "",
    false,
  );
  customer.defaultBillingAddressId === addressId
    ? (checkboxBillingDefaulth.checked = true)
    : (checkboxBillingDefaulth.checked = false);

  checkboxBillingDefaulth.disabled = true;
  // включение дефолтного, включает обычный
  checkboxBillingDefaulth.addEventListener("change", () => {
    if (checkboxBillingDefaulth.checked) {
      checkboxBilling.checked = checkboxBillingDefaulth.checked;
    }
  });
  const billingDefaulthText = createElement("span", "checkbox-text", "use as defaulth billing address?");
  const billingDefaulthGroup = createElement("div", "checkbox-group");
  billingDefaulthGroup.append(billingDefaulthText, checkboxBillingDefaulth);

  const checkboxShippingDefaulth = createInput(
    "checkbox",
    "profile-inform__checkbox",
    "checkbox-shippingDefaulth",
    "",
    false,
  );
  customer.defaultShippingAddressId === addressId
    ? (checkboxShippingDefaulth.checked = true)
    : (checkboxShippingDefaulth.checked = false);

  checkboxShippingDefaulth.disabled = true;
  // включение дефолтного, включает обычный
  checkboxShippingDefaulth.addEventListener("change", () => {
    if (checkboxShippingDefaulth.checked) {
      checkboxShipping.checked = checkboxShippingDefaulth.checked;
    }
  });
  const shippingDefaulthText = createElement("span", "checkbox-text", "use as defaulth shipping address?");
  const shippingDefaulthGroup = createElement("div", "checkbox-group");
  shippingDefaulthGroup.append(shippingDefaulthText, checkboxShippingDefaulth);

  checkboxWrapper.append(shippingGroup, billingGroup, shippingDefaulthGroup, billingDefaulthGroup);

  return checkboxWrapper;
}
