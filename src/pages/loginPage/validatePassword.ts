export const validatePassword = () => {
  const loginForm = document.querySelector(".login-form") as HTMLFormElement;
  const passwordInput = loginForm.querySelector('input[placeholder="Password"]') as HTMLInputElement;

  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(passwordInput.value);
  const hasLowerCase = /[a-z]/.test(passwordInput.value);
  const hasDigit = /[0-9]/.test(passwordInput.value);
  const hasSpecialChar = /[!@#$%^&*]/.test(passwordInput.value);

  return {
    isValid: passwordInput.value.length >= minLength && hasUpperCase && hasLowerCase && hasDigit,
    errors: {
      messageStart: "Your password should:",
      minLengthError: passwordInput.value.length < minLength ? "Be at least 8 characters long." : "",
      upperCaseError: !hasUpperCase ? "Contain at least one uppercase letter." : "",
      lowerCaseError: !hasLowerCase ? "Contain at least one  lowercase letter." : "",
      digitError: !hasDigit ? "Contain at least one digit." : "",
      specialCharError: hasSpecialChar ? "" : "May contain at least one special character.",
    },
  };
};
