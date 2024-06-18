import { disableForBillingInput } from "./disableForBillingInput";
import { changeRequiredForBilling } from "./changeRequiredForBilling";

export function changeStateBilling(state?: boolean): void {
  const choise = document.getElementById("one-address") as HTMLInputElement;
  if (choise.checked) {
    disableForBillingInput(true);
    changeRequiredForBilling(false);
  } else {
    disableForBillingInput(false);
    changeRequiredForBilling(true);
  }
  if (state) {
    const streetBilling = document.querySelector(".label-street-billing");
    const houseBilling = document.querySelector(".label-building-billing");
    const apartBilling = document.querySelector(".label-apartment-billing");
    streetBilling?.classList.remove("label-registration_active");
    houseBilling?.classList.remove("label-registration_active");
    apartBilling?.classList.remove("label-registration_active");
  }
}
