import { createElement } from "../createElement";
import { createInput } from "../createInput";
import { createSelectCountry } from "../createSelectCountry";
import { activateInput } from "./activateInput";
import { changeAddress } from "../../change/changeAddress";
import { deleteAddressId } from "../../../apiRequests/addAddress/deleteAddressId";
import { checkboxBlock } from "./checkboxBlock";
import { createProfilePage } from "../../../pages/profile/createProfilePage";

export async function profileChangeAddress(
  customerId: string,
  addressId: string,
  country: string,
  city: string,
  postcode: string,
  street: string,
  house: string,
  apartment: string,
): Promise<HTMLElement> {
  const wrapper = createElement("div", "profile-inform");
  wrapper.classList.add("profile-inform_address", "profile-inform_disable");
  wrapper.setAttribute("name", addressId);

  const countryBlock = createSelectCountry();
  const options = countryBlock.options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === country) {
      options[i].selected = true;
      break;
    }
  }
  countryBlock.disabled = true;

  const cityInput = createInput("text", "profile-inform__input", "inform__city", "", false);
  cityInput.value = city;
  cityInput.disabled = true;

  const postcodeInput = createInput("number", "profile-inform__input", "inform__postcode", "", false);
  postcodeInput.value = postcode;
  postcodeInput.disabled = true;

  const streetInput = createInput("text", "profile-inform__input", "inform__street", "", false);
  streetInput.value = street;
  streetInput.disabled = true;

  const houseInput = createInput("text", "profile-inform__input", "inform__house", "", false);
  houseInput.value = house;
  houseInput.disabled = true;

  const apartmentInput = createInput("number", "profile-inform__input", "inform__apartment", "", false);
  apartmentInput.value = apartment;
  apartmentInput.disabled = true;

  const checkboxWrapper = await checkboxBlock(customerId, addressId);

  const buttonsBlock = createElement("div", "profile-inform-buttons");

  const editButton = createElement("div", "profile-inform__edit", "edit");
  editButton.classList.add("profile-inform-address__edit");
  editButton.addEventListener("click", () => {
    if (editButton.classList.contains("disable_btn")) return;
    activateInput(buttonsBlock);
    saveButton.classList.remove("profile-inform__save_disable");
    editButton.classList.add("disable_btn");
  });
  const saveButton = createElement("div", "profile-inform__save", "save");
  saveButton.classList.add("profile-inform__save_disable");

  const deleteAddres = createElement("div", "profile-add__default", "delete");

  deleteAddres.addEventListener("click", async () => {
    await deleteAddressId(customerId, addressId);
    wrapper.innerHTML = `Address was deleted`;
    createProfilePage();
  });

  buttonsBlock.append(editButton, saveButton, deleteAddres);

  wrapper.append(
    countryBlock,
    cityInput,
    postcodeInput,
    streetInput,
    houseInput,
    apartmentInput,
    checkboxWrapper,
    buttonsBlock,
  );
  saveButton.addEventListener("click", async () => {
    if (saveButton.classList.contains("profile-inform__save_disable")) return;
    await changeAddress(wrapper);
    activateInput(buttonsBlock);
    saveButton.classList.add("profile-inform__save_disable");
    editButton.classList.remove("disable_btn");
    createProfilePage();
  });
  return wrapper;
}
