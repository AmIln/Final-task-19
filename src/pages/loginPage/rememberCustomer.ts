export const rememberEmail = () => {
  const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
  const rememberMeCheckbox = document.getElementById("rememberCheckbox") as HTMLInputElement;

  rememberMeCheckbox.addEventListener("change", () => {
    if (rememberMeCheckbox.checked) {
      localStorage.setItem("rememberedEmail", emailInput.value);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
  });
};
