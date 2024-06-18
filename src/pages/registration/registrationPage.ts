import { createRegistrationForm } from "../../helpers/creators/registration/createRegistrationForm";
import { createFormHandlers } from "../../helpers/creators/registration/createFormHandlers";
import { changeStateBilling } from "../../helpers/creators/registration/changeStateBilling";

export function registrationPage(parent: HTMLElement): void {
  createRegistrationForm(parent);
  createFormHandlers();
  changeStateBilling();
}
