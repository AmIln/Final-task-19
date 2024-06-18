import "./login.scss";
import "@fortawesome/fontawesome-free/js/all.js";
import { loginFormValidation } from "./loginValidation";
import { showPassword } from "./showPassword";
import { fillEmail } from "./fillEmail";
import { apiAuthorizeUser } from "../../apiRequests/apiAuthCustomer";
import { rememberEmail } from "./rememberCustomer";
import { validateEmail } from "./validateEmail";
import { validatePassword } from "./validatePassword";
import { isLoggedIn } from "../../helpers/checks/isLoggedIn";
import { route } from "../../router/route";

export function createLoginForm(): void {
  if (isLoggedIn()) {
    route(window.location.origin);
    return;
  }

  const forma: HTMLFormElement = document.createElement("form");
  forma.className = "login-form";
  const content = document.getElementById("content") as HTMLDivElement;
  content.innerHTML = "";

  const loginTitle: HTMLHeadingElement = document.createElement("h2");
  loginTitle.textContent = "Sign in and start shopping";
  forma.appendChild(loginTitle);

  for (let i = 0; i < 2; i++) {
    const inputBox: HTMLDivElement = document.createElement("div");
    inputBox.className = "input-box";
    forma.appendChild(inputBox);
    inputBox.innerHTML +=
      i == 0
        ? '<span><i class="fa-solid fa-envelope"></i> </span>'
        : '<span  class="password-icon"><i class="fa-solid fa-eye-slash"></i></span>';
    const input: HTMLInputElement = document.createElement("input");
    input.setAttribute("type", `${i == 0 ? "email" : "password"}`);
    input.placeholder = `${i == 0 ? "Email" : "Password"}`;
    input.setAttribute("required", "");
    const errorMessage: HTMLDivElement = document.createElement("div");
    errorMessage.className = "errorMessage";
    inputBox.appendChild(input);
    inputBox.appendChild(errorMessage);
  }

  const button: HTMLButtonElement = document.createElement("button");
  button.className = "login-btn-grad";
  button.setAttribute("type", "submit");
  button.textContent = "Login";
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    if (validateEmail().isValid && validatePassword().isValid) {
      apiAuthorizeUser()
        .then((authorize) => {
          if (authorize) {
            setTimeout(() => route(window.location.origin), 2000);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  const rememberCheckbox: HTMLInputElement = document.createElement("input");
  rememberCheckbox.setAttribute("type", "checkbox");
  rememberCheckbox.id = "rememberCheckbox";
  rememberCheckbox.checked = true;
  const rememberLabel: HTMLLabelElement = document.createElement("label");
  rememberLabel.textContent = "Remember me";
  rememberLabel.setAttribute("for", "rememberCheckbox");

  const registrationLink: HTMLAnchorElement = document.createElement("a");
  registrationLink.innerHTML = `Don't have an account? <span>Register here! </span>`;
  registrationLink.href = "#registration";

  registrationLink.addEventListener("click", (e) => {
    e.preventDefault();
    route(registrationLink.href);
  });

  forma.append(rememberCheckbox, rememberLabel, button, registrationLink);
  content.append(forma);

  showPassword();
  fillEmail();
  rememberEmail();
  loginFormValidation();
}
