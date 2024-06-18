import { checkRegisstrationForm } from "../../checks/checkRegisstrationForm";
import { changeStateBilling } from "./changeStateBilling";
import { registrationCustomer } from "./registrationCustomer";

export function createFormHandlers(): void {
  const form = document.querySelector(".form") as HTMLFormElement;
  const buttonForm = document.querySelector(".button-form") as HTMLButtonElement;
  form.addEventListener("keypress", function (e) {
    const key = e.code;
    if (key.toString() === "Enter" || key.toString() === "NumpadEnter") {
      buttonForm.click();
    }
  });

  const choise = document.getElementById("one-address") as HTMLInputElement;
  choise.addEventListener("change", () => {
    changeStateBilling(choise.checked);
  });

  buttonForm.addEventListener("click", async () => {
    if (checkRegisstrationForm()) {
      registrationCustomer();
    }
  });
}
