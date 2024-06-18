import { createElement } from "../createElement";
import { profileChangeAddress } from "./profileChangeAddress";
import { showAddress } from "./showAddress";
import { AddShippingAddressId } from "../../../apiRequests/addAddress/AddShippingAddressId";
import { AddBillingAddressId } from "../../../apiRequests/addAddress/AddBillingAddressId";
import { apiAddFullAdress } from "../../../apiRequests/apiAddFullAdress";
import { ProfileChangeModalWindow } from "../../creators/profile/profileChangeModalWindow";
import { getCustomerById } from "../../../apiRequests/getCustomerById";

export async function AddNewAddres(parent: HTMLElement, addressParent: HTMLElement, clientId: string) {
  const addShippingAddres = createElement("div", "shipping-address__add", "Add Shiping Addres");
  addShippingAddres.classList.add("profile-inform-address__edit");
  const addBillingAddres = createElement("div", "billing-address__add", "Add Billing Addres");
  addBillingAddres.classList.add("profile-inform-address__edit");
  parent.append(addShippingAddres, addBillingAddres);
  const postcodePattern = /^\d{6}$/;
  const apartmentPattern = /^(\d{1,3})$/;
  const adressPattern = /^[a-zA-Z0-9\s]{4,}$/;
  const buildingPattern = /^[a-zA-Z0-9\s]{1,}$/;
  const select = document.getElementById("select-address") as HTMLSelectElement;

  const customer = await getCustomerById(clientId);
  const allAddresses = customer.addresses;
  let countAddresses = allAddresses.length + 1;
  addShippingAddres.addEventListener("click", async () => {
    if (addShippingAddres.classList.contains("disable_btn") || addBillingAddres.classList.contains("disable_btn"))
      return;
    addShippingAddres.classList.add("disable_btn");
    addBillingAddres.classList.add("disable_btn");
    const newShippindAddres = await profileChangeAddress(clientId, "", "", "", "", "", "", "");
    const addressOption = createElement(
      "option",
      "option-address",
      `Address - ${String(countAddresses)}`,
    ) as HTMLOptionElement;
    addressOption.value = String(countAddresses);
    select.append(addressOption);

    addressOption.value = String(countAddresses);
    select.value = `${countAddresses}`;

    countAddresses++;

    newShippindAddres.classList.add("profile-inform_address");
    addressParent.append(newShippindAddres);
    const country = document.querySelectorAll(".select-country")[countAddresses - 2] as HTMLSelectElement;
    const saveBtns = addressParent.querySelectorAll(".profile-inform__save");
    const city = document.querySelectorAll('[name="inform__city"]')[countAddresses - 2] as HTMLInputElement;
    const postcode = document.querySelectorAll('[name="inform__postcode"]')[countAddresses - 2] as HTMLInputElement;
    const street = document.querySelectorAll('[name="inform__street"]')[countAddresses - 2] as HTMLInputElement;
    const house = document.querySelectorAll('[name="inform__house"]')[countAddresses - 2] as HTMLInputElement;
    const apartment = document.querySelectorAll('[name="inform__apartment"]')[countAddresses - 2] as HTMLInputElement;
    saveBtns[0]?.addEventListener("click", async () => {
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
      if (result) {
        const address = await apiAddFullAdress(
          clientId,
          country.value,
          city.value,
          postcode.value,
          street.value,
          house.value,
          apartment.value,
        );
        ProfileChangeModalWindow(true, "Changes saved", "You add new shipping addres");
        if (address.addresses[countAddresses - 2]) {
          await AddShippingAddressId(clientId, address.addresses[countAddresses - 2].id);
        }
        window.scrollTo(0, 0);
        setTimeout(() => location.reload(), 2000);
      }
    });
    showAddress();
  });
  addBillingAddres.addEventListener("click", async () => {
    if (addShippingAddres.classList.contains("disable_btn") || addBillingAddres.classList.contains("disable_btn"))
      return;
    addShippingAddres.classList.add("disable_btn");
    addBillingAddres.classList.add("disable_btn");
    const newShippindAddres = await profileChangeAddress(clientId, "", "", "", "", "", "", "");
    const addressOption = createElement(
      "option",
      "option-address",
      `Address - ${String(countAddresses)}`,
    ) as HTMLOptionElement;
    select.append(addressOption);

    addressOption.value = String(countAddresses);
    select.value = `${countAddresses}`;

    countAddresses++;
    newShippindAddres.classList.add("profile-inform_address");
    addressParent.append(newShippindAddres);
    const country = document.querySelectorAll(".select-country")[countAddresses - 2] as HTMLSelectElement;
    const saveBtns = addressParent.querySelectorAll(".profile-inform__save");
    const city = document.querySelectorAll('[name="inform__city"]')[countAddresses - 2] as HTMLInputElement;
    const postcode = document.querySelectorAll('[name="inform__postcode"]')[countAddresses - 2] as HTMLInputElement;
    const street = document.querySelectorAll('[name="inform__street"]')[countAddresses - 2] as HTMLInputElement;
    const house = document.querySelectorAll('[name="inform__house"]')[countAddresses - 2] as HTMLInputElement;
    const apartment = document.querySelectorAll('[name="inform__apartment"]')[countAddresses - 2] as HTMLInputElement;
    saveBtns[countAddresses - 2]?.addEventListener("click", async () => {
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
      if (result) {
        const address = await apiAddFullAdress(
          clientId,
          country.value,
          city.value,
          postcode.value,
          street.value,
          house.value,
          apartment.value,
        );
        ProfileChangeModalWindow(true, "Changes saved", "You add new billing addres");
        if (address.addresses[countAddresses - 2]) {
          await AddBillingAddressId(clientId, address.addresses[countAddresses - 2].id);
        }
        window.scrollTo(0, 0);
        setTimeout(() => location.reload(), 2000);
      }
    });
    showAddress();
  });
}
