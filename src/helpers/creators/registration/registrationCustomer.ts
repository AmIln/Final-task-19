import { apiCreateCustomer } from "../../../apiRequests/apiCreateCustomer";
import { setDateOfBirth } from "../../../apiRequests/setDateOfBirth";
import { apiAddAdress } from "../../../apiRequests/apiAddAdress";
import { AddShippingAddressId } from "../../../apiRequests/addAddress/AddShippingAddressId";
import { AddBillingAddressId } from "../../../apiRequests/addAddress/AddBillingAddressId";
import { apiAuthorizeUser } from "../../../apiRequests/apiAuthCustomer";
import { route } from "../../../router/route";

export async function registrationCustomer() {
  const choise = document.getElementById("one-address") as HTMLInputElement;
  const emailInput = document.getElementById("input-email") as HTMLInputElement;
  const nameInput = document.getElementById("input-name") as HTMLInputElement;
  const surnameInput = document.getElementById("input-surname") as HTMLInputElement;
  const passwordInput = document.getElementById("input-password") as HTMLInputElement;
  const birthInput = document.getElementById("birth") as HTMLInputElement;
  const streetInput = document.getElementById("street") as HTMLInputElement;
  const buildingInput = document.getElementById("building") as HTMLInputElement;
  const apartmentInput = document.getElementById("apartment") as HTMLInputElement;

  const streetBilling = document.getElementById("street-billing") as HTMLInputElement;
  const houseBilling = document.getElementById("building-billing") as HTMLInputElement;
  const apartmentBilling = document.getElementById("apartment-billing") as HTMLInputElement;

  const createCustomer = await apiCreateCustomer(emailInput, nameInput, surnameInput, passwordInput);
  if (!createCustomer) {
    return;
  }

  const clientId = createCustomer.customer.id;
  setDateOfBirth(clientId, birthInput.value).then(async () => {
    if (choise.checked) {
      const address = await apiAddAdress(clientId, streetInput.value, buildingInput.value, apartmentInput.value);
      await AddShippingAddressId(clientId, address.addresses[0].id);
      await AddBillingAddressId(clientId, address.addresses[0].id);
    } else {
      const addShipping = await apiAddAdress(clientId, streetInput.value, buildingInput.value, apartmentInput.value);
      await AddShippingAddressId(clientId, addShipping.addresses[0].id);
      const addBilling = await apiAddAdress(clientId, streetBilling.value, houseBilling.value, apartmentBilling.value);
      await AddBillingAddressId(clientId, addBilling.addresses[1].id);
    }
    await apiAuthorizeUser();
    await route(window.location.origin);
  });
}
