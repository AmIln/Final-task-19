export const fillEmail = () => {
  const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
  const rememberedEmail = localStorage.getItem("rememberedEmail");

  if (emailInput && rememberedEmail) {
    emailInput.value = rememberedEmail;
  }
};
