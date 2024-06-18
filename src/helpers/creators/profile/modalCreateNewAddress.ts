import { createNewAddress } from "../../../apiRequests/addAddress/createNewAddress";
import { createProfilePage } from "../../../pages/profile/createProfilePage";
import { checkCreateAddressForm } from "../../checks/checkCreateAddressForm";
import { createElement } from "../createElement";
import { createInput } from "../createInput";
import { createSelectCountry } from "../createSelectCountry";

export function modalCreateNewAddress(): void {
  const content = document.getElementById("content") as HTMLDivElement;
  const customerId = localStorage.getItem("customerId");
  if (!customerId) return; //заглушка

  const modalWrapper = createElement("div", "create-wrapper");
  modalWrapper.addEventListener("click", (event: Event) => {
    if (event.target === modalWrapper) {
      modalWrapper.remove();
    }
  });

  const modalBody = createElement("div", "create-body");

  const countryBlock = createSelectCountry();

  const cityInput = createInput("text", "create-inform__input", "create-inform__city", "create-inform__city", true);
  cityInput.placeholder = "City";
  const cityLabel = createElement(
    "label",
    "create-inform__label",
    "only latin, first letter capitalized, min 3 letters",
    "create-inform__label",
  );
  const cityBlock = createElement("div", "create-block");
  cityBlock.append(cityInput, cityLabel);

  const postcodeInput = createInput(
    "number",
    "create-inform__input",
    "create-inform__postcode",
    "create-inform__postcode",
    true,
  );
  postcodeInput.placeholder = "postcode";
  const postcodeLabel = createElement("label", "create-inform__label", "size - 6, only number", "create-inform__label");
  const postcodeBlock = createElement("div", "create-block");
  postcodeBlock.append(postcodeInput, postcodeLabel);

  const streetInput = createInput(
    "text",
    "create-inform__input",
    "create-inform__street",
    "create-inform__street",
    true,
  );
  streetInput.placeholder = "Street";
  const streetLabel = createElement(
    "label",
    "create-inform__label",
    "min size - 4, numbers or letters",
    "create-inform__label",
  );
  const streetBlock = createElement("div", "create-block");
  streetBlock.append(streetInput, streetLabel);

  const houseInput = createInput("text", "create-inform__input", "create-inform__house", "create-inform__house", true);
  houseInput.placeholder = "House";
  const houseLabel = createElement(
    "label",
    "create-inform__label",
    "max size - 3, only numbers",
    "create-inform__label",
  );
  const houseBlock = createElement("div", "create-block");
  houseBlock.append(houseInput, houseLabel);

  const apartmentInput = createInput(
    "number",
    "create-inform__input",
    "create-inform__apartment",
    "create-inform__apartment",
    true,
  );
  apartmentInput.placeholder = "apartment number";
  const apartmentLabel = createElement(
    "label",
    "create-inform__label",
    "max size - 3, only numbers",
    "create-inform__label",
  );
  const apartmentBlock = createElement("div", "create-block");
  apartmentBlock.append(apartmentInput, apartmentLabel);

  const saveButton = createElement("div", "create-inform__save", "save");
  saveButton.addEventListener("click", async () => {
    checkCreateAddressForm();
    if (checkCreateAddressForm()) {
      await createNewAddress(customerId);
      createProfilePage();
    }
  });

  modalBody.append(countryBlock, cityBlock, postcodeBlock, streetBlock, houseBlock, apartmentBlock, saveButton);

  modalWrapper.append(modalBody);
  content.append(modalWrapper);
}
