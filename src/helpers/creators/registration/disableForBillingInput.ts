export function disableForBillingInput(state: boolean): void {
  const street = document.getElementById("street-billing") as HTMLInputElement;
  const house = document.getElementById("building-billing") as HTMLInputElement;
  const apart = document.getElementById("apartment-billing") as HTMLInputElement;

  street.disabled = state;
  house.disabled = state;
  apart.disabled = state;
}
