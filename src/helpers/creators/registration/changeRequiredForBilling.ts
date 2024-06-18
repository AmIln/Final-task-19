export function changeRequiredForBilling(state: boolean): void {
  const street = document.getElementById("street-billing") as HTMLInputElement;
  const house = document.getElementById("building-billing") as HTMLInputElement;
  const apart = document.getElementById("apartment-billing") as HTMLInputElement;
  street.required = state;
  house.required = state;
  apart.required = state;
}
