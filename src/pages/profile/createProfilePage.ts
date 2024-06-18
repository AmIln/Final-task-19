import { profileChangeBlock } from "../../helpers/creators/profile/profileChangeBlock";
import { getCustomerById } from "../../apiRequests/getCustomerById";
import { createElement } from "../../helpers/creators/createElement";
import { passwordWrapper } from "../../helpers/creators/profile/passwordWrapper";
import { showAddress } from "../../helpers/creators/profile/showAddress";
import { modalCreateNewAddress } from "../../helpers/creators/profile/modalCreateNewAddress";
import { recordingAddresses } from "../../helpers/creators/profile/recordingAddresses";

export async function createProfilePage(): Promise<void> {
  const content = document.querySelector(".content") as HTMLDivElement;
  content.innerHTML = "";

  const profileWrapper = createElement("div", "profile");

  const customerId = localStorage.getItem("customerId");
  if (!customerId) return;
  const customer = await getCustomerById(customerId);

  const emailBlock = await profileChangeBlock("email", "inform__email", customer.email);
  const nameBlock = await profileChangeBlock("text", "inform__name", customer.firstName);
  const surnameBlock = await profileChangeBlock("text", "inform__lastName", customer.lastName);
  const birthBlock = await profileChangeBlock("date", "inform__birth", customer.dateOfBirth);
  const passwortBlock = passwordWrapper();

  const addresessesSelect = createElement("select", "select-address", "", "select-address");
  addresessesSelect.addEventListener("change", () => {
    showAddress();
  });
  const addAddressButtonWraper = createElement("div", "addressesBtn-wrapper");
  const addressesWrapper = createElement("div", "addresses-wrapper");
  const resultAddresses = await recordingAddresses(addresessesSelect);

  const createNewAddressButton = createElement("div", "create-address", "create new address?", "create-address");
  createNewAddressButton.addEventListener("click", () => {
    modalCreateNewAddress();
  });

  profileWrapper.append(
    emailBlock,
    nameBlock,
    surnameBlock,
    birthBlock,
    passwortBlock,
    addresessesSelect,
    addAddressButtonWraper,
    resultAddresses,
    addressesWrapper,
    createNewAddressButton,
  );
  content.append(profileWrapper);
  showAddress();
  //AddNewAddres(addAddressButtonWraper, addressesWrapper, customerId);
}
