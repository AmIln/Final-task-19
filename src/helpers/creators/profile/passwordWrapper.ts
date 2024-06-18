import { createElement } from "../createElement";
import { createInput } from "../createInput";
import { activateInput } from "./activateInput";
import { changeImformation } from "../../checks/changeImformation";

export function passwordWrapper(): HTMLElement {
  const passportWrapper = createElement("div", "password-wrapper");

  const passwordInput = createInput(
    "password",
    "inform__password",
    "inform__password",
    "inform__password",
    false,
  ) as HTMLInputElement;
  passwordInput.disabled = true;
  const passwordTitle = createElement("span", "password-title", "your password:");

  const newPasswordInput = createInput(
    "password",
    "inform__password",
    "inform__new-password",
    "inform__new-password",
    false,
  );
  newPasswordInput.disabled = true;
  const passwordNewTitle = createElement("span", "password-title", "NEW password:");

  const passwordBlock = createElement("div", "password-block");
  passwordBlock.append(passwordTitle, passwordInput);
  const newPasswordBlock = createElement("div", "password-block");
  newPasswordBlock.append(passwordNewTitle, newPasswordInput);

  const buttonsBlock = createElement("div", "profile-inform-buttons");

  const editButton = createElement("div", "profile-inform__edit", "edit");
  editButton.addEventListener("click", () => {
    if (editButton.classList.contains("disable_btn")) return;
    activateInput(passwordInput);
    activateInput(newPasswordInput);
    editButton.classList.add("disable_btn");
    saveButton.classList.remove("profile-inform__save_disable");
  });
  const saveButton = createElement("div", "profile-inform__save", "save");
  saveButton.classList.add("profile-inform__save_disable");
  saveButton.addEventListener("click", () => {
    if (saveButton.classList.contains("profile-inform__save_disable")) return;
    activateInput(passwordInput);
    activateInput(newPasswordInput);
    editButton.classList.remove("disable_btn");
    saveButton.classList.add("profile-inform__save_disable");
    changeImformation(passwordInput.id);
  });

  buttonsBlock.append(editButton, saveButton);

  passportWrapper.append(passwordBlock, newPasswordBlock, buttonsBlock);
  return passportWrapper;
}
