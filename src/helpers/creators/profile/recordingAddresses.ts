import { getCustomerById } from "../../../apiRequests/getCustomerById";
import { Address } from "../../interfaces/Address";
import { createElement } from "../createElement";
import { profileChangeAddress } from "./profileChangeAddress";

export async function recordingAddresses(select: HTMLElement): Promise<HTMLElement> {
  let countAddresses = 0;
  const addressesWrapper = createElement("div", "addresses-wrapper");
  const customerId = localStorage.getItem("customerId");
  if (!customerId) return addressesWrapper; // заглушка
  const customer = await getCustomerById(customerId);
  const allAddresses = customer.addresses;

  try {
    await Promise.all(
      allAddresses.map(async (element: Address) => {
        countAddresses++;
        const addressOption = createElement(
          "option",
          "option-address",
          `Address - ${String(countAddresses)}`,
        ) as HTMLOptionElement;
        addressOption.value = String(countAddresses);

        const address = await profileChangeAddress(
          customer.id,
          element.id,
          element.country,
          element.city,
          element.postalCode,
          element.streetName,
          element.building,
          element.apartment,
        );
        if (element.id === customer.defaultShippingAddressId) {
          const defaulthShipping = createElement("div", "isDefaulth", "this is the default shipping address");
          defaulthShipping.classList.add("isDefaulth_Shipping");
          address.prepend(defaulthShipping);
        }
        if (element.id === customer.defaultBillingAddressId) {
          const defaulthBilling = createElement("div", "isDefaulth", "this is the default billing address");
          defaulthBilling.classList.add("isDefaulth_Billing");
          address.prepend(defaulthBilling);
        }

        select.append(addressOption);
        addressesWrapper.append(address);
      }),
    );
  } catch (error) {
    //TODO: нужно написать обработку ошибки
  }

  return addressesWrapper;
}
