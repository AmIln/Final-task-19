export function checkCreateAddressForm(): boolean {
  const pattern = /^[A-Z][a-zA-Z]{2,}$/;
  const postcodePattern = /^\d{6}$/;
  const apartmentPattern = /^(\d{1,3})$/;
  const adressPattern = /^[a-zA-Z0-9\s]{4,}$/;
  const buildingPattern = /^[a-zA-Z0-9\s]{1,}$/;
  const activeLabelClass = "create-inform__label_active";
  let result = true;

  const city = document.getElementById("create-inform__city") as HTMLInputElement;
  const postcode = document.getElementById("create-inform__postcode") as HTMLInputElement;
  const street = document.getElementById("create-inform__street") as HTMLInputElement;
  const house = document.getElementById("create-inform__house") as HTMLInputElement;
  const apartment = document.getElementById("create-inform__apartment") as HTMLInputElement;

  const labels = document.querySelectorAll(".create-inform__label");
  const inputs = [city, postcode, street, house, apartment];
  const patterns = [pattern, postcodePattern, adressPattern, buildingPattern, apartmentPattern];

  for (let i = 0; i < inputs.length; i++) {
    if (patterns[i].test(inputs[i].value)) {
      labels[i].classList.remove(activeLabelClass);
    } else {
      labels[i].classList.add(activeLabelClass);
      result = false;
    }
  }
  return result;
}
