import { isLoginBtnDisabled } from "./isLoginBtnDisabled";
import { updateErrorMessage } from "./updateErrorMessage";
import { validateEmail } from "./validateEmail";
import { validatePassword } from "./validatePassword";

export const loginFormValidation = (): void => {
  const loginForm = document.querySelector(".login-form") as HTMLFormElement;
  const errorMessage = loginForm.querySelectorAll<HTMLDivElement>(".errorMessage");

  const emailError = errorMessage[0];
  const passwordError = errorMessage[1];

  loginForm.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.trim();

    if (target.type === "email") {
      if (target.value === "") {
        emailError.textContent = "";
      } else {
        updateErrorMessage(emailError, validateEmail(), "Please use the format: <p>user@example.com</p>");
      }
    } else if (target.getAttribute("placeholder") === "Password") {
      if (target.value === "") {
        passwordError.textContent = "";
      } else {
        updateErrorMessage(passwordError, validatePassword());
      }
    }
    isLoginBtnDisabled();
  });
};
