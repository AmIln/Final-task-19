export const isLoginBtnDisabled = () => {
  const loginBtn = document.querySelector(".login-btn-grad") as HTMLButtonElement;
  const loginForm = document.querySelector(".login-form");
  const errorMessage = loginForm?.querySelectorAll(".errorMessage");
  const emailInput = loginForm?.querySelector('input[type="email"]') as HTMLInputElement;
  const passwordInput = loginForm?.querySelector('input[placeholder="Password"]') as HTMLInputElement;

  if (loginForm && errorMessage && loginBtn) {
    if (
      errorMessage[0].innerHTML === "" &&
      errorMessage[1].innerHTML === "" &&
      emailInput.value !== "" &&
      passwordInput.value !== ""
    ) {
      loginBtn.disabled = false;
    } else {
      loginBtn.disabled = true;
    }
  }
};
