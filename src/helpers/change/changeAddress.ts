import { AddBillingAddressId } from "../../apiRequests/addAddress/AddBillingAddressId";
import { AddShippingAddressId } from "../../apiRequests/addAddress/AddShippingAddressId";
import { RemoveBillingAddressId } from "../../apiRequests/addAddress/RemoveBillingAddressId";
import { RemoveShippingAddressId } from "../../apiRequests/addAddress/RemoveShippingAddressId";
import { SetDefaultBillingAddress } from "../../apiRequests/addAddress/SetDefaultBillingAddress";
import { SetDefaultShippingAddress } from "../../apiRequests/addAddress/SetDefaultShippingAddress";
import { apiChangeAddress } from "../../apiRequests/change/apiChangeAddress";
import { ProfileChangeModalWindow } from "../creators/profile/profileChangeModalWindow";

export async function changeAddress(addressBlock: HTMLElement): Promise<boolean> {
  const postcodePattern = /^\d{6}$/;
  const apartmentPattern = /^(\d{1,3})$/;
  const adressPattern = /^[a-zA-Z0-9\s]{4,}$/;
  const buildingPattern = /^[a-zA-Z0-9\s]{1,}$/;

  const idAddress = addressBlock.getAttribute("name");
  const country = addressBlock.querySelector("select") as HTMLSelectElement;
  const city = addressBlock.querySelector("input[name='inform__city']") as HTMLInputElement;
  const postcode = addressBlock.querySelector("input[name='inform__postcode']") as HTMLInputElement;
  const street = addressBlock.querySelector("input[name='inform__street']") as HTMLInputElement;
  const house = addressBlock.querySelector("input[name='inform__house']") as HTMLInputElement;
  const apartment = addressBlock.querySelector("input[name='inform__apartment']") as HTMLInputElement;
  const shipping = addressBlock.querySelector("input[name='checkbox-shipping']") as HTMLInputElement;
  const shippingDefaulth = addressBlock.querySelector("input[name='checkbox-shippingDefaulth']") as HTMLInputElement;
  const billing = addressBlock.querySelector("input[name='checkbox-billing']") as HTMLInputElement;
  const billingDefaulth = addressBlock.querySelector("input[name='checkbox-billingDefaulth']") as HTMLInputElement;

  let result = true;
  if (!adressPattern.test(city.value)) {
    ProfileChangeModalWindow(false, "Changes were not saved", "Enter the correct city");
    result = false;
  }
  if (!postcodePattern.test(postcode.value)) {
    ProfileChangeModalWindow(false, "Changes were not saved", "Enter the correct postcode");
    result = false;
  }
  if (!adressPattern.test(street.value)) {
    ProfileChangeModalWindow(false, "Changes were not saved", "Enter the correct street");
    result = false;
  }
  if (!buildingPattern.test(house.value)) {
    ProfileChangeModalWindow(false, "Changes were not saved", "Enter the correct house number");
    result = false;
  }
  if (!apartmentPattern.test(apartment.value)) {
    ProfileChangeModalWindow(false, "Changes were not saved", "Enter the correct apartment number");
    result = false;
  }

  if (!result) return false;

  const customerId = localStorage.getItem("customerId");
  if (!customerId) return false;
  if (!idAddress) return false;

  await apiChangeAddress(
    customerId,
    idAddress,
    country.value,
    city.value,
    postcode.value,
    street.value,
    house.value,
    apartment.value,
  );

  if (shipping.checked) {
    await AddShippingAddressId(customerId, idAddress);
  } else {
    await RemoveShippingAddressId(customerId, idAddress);
  }

  if (billing.checked) {
    await AddBillingAddressId(customerId, idAddress);
  } else {
    await RemoveBillingAddressId(customerId, idAddress);
  }

  if (shippingDefaulth.checked) {
    await SetDefaultShippingAddress(customerId, idAddress);
  }

  if (billingDefaulth.checked) {
    await SetDefaultBillingAddress(customerId, idAddress);
  }

  ProfileChangeModalWindow(result, "Changes saved", "");
  return true;
}
