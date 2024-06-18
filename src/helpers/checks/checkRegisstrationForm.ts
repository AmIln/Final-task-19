import { isOlderThan13 } from "./checkBirth";

export function checkRegisstrationForm(): boolean {
  const pattern = /^[A-Z][a-zA-Z]{2,}$/;
  const postcodePattern = /^\d{6}$/;
  const apartmentPattern = /^(\d{1,3})$/;
  const adressPattern = /^[a-zA-Z0-9\s]{4,}$/;
  const buildingPattern = /^[a-zA-Z0-9\s]{1,}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const birthPattern = /^(19|20)\d\d[- /.](0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const countrySelect = document.getElementById("country") as HTMLSelectElement;
  const labelList = document.querySelectorAll(".label-registration");
  const inputsList = document.querySelectorAll(".input-inform_registration");
  const choise = document.getElementById("one-address") as HTMLInputElement;
  const birth = document.getElementById("birth") as HTMLInputElement;

  let result = true;

  const inputsToCheck = [
    { id: "input-email", pattern: emailPattern },
    { id: "input-name", pattern: pattern },
    { id: "input-surname", pattern: pattern },
    { id: "input-password", pattern: passwordPattern },
    { id: "birth", pattern: birthPattern },
    { id: "city", pattern: pattern },
    { id: "postcode", pattern: postcodePattern },
    { id: "street", pattern: adressPattern },
    { id: "building", pattern: buildingPattern },
    { id: "apartment", pattern: apartmentPattern },
    { id: "street-billing", pattern: adressPattern },
    { id: "building-billing", pattern: buildingPattern },
    { id: "apartment-billing", pattern: apartmentPattern },
  ];

  if (!countrySelect.value) {
    result = false;
  }

  for (let i = 0; i < inputsList.length; i++) {
    const currentInput = inputsList[i] as HTMLInputElement;
    if (
      choise.checked &&
      (currentInput.id === "street-billing" ||
        currentInput.id === "building-billing" ||
        currentInput.id === "apartment-billing")
    )
      continue;
    inputsToCheck.forEach((input) => {
      if (currentInput.id === input.id) {
        if (input.pattern.test(currentInput.value)) {
          labelList[i].classList.remove("label-registration_active");
        } else {
          labelList[i].classList.add("label-registration_active");
          result = false;
        }
      }
    });
  }
  if (!isOlderThan13(birth.value)) {
    labelList[4].classList.add("label-registration_active");
    result = false;
  }
  return result;
}
