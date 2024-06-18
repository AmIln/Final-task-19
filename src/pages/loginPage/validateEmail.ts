export const validateEmail = () => {
  const loginForm = document.querySelector(".login-form") as HTMLFormElement;
  const emailInput = loginForm.querySelector('input[type="email"]') as HTMLInputElement;
  const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
  const hasAtSymbol = emailInput.value.includes("@");
  const domainParts = emailInput.value.split("@");
  const domain = domainParts[1];
  const hasSpaces = /\s/.test(emailInput.value);
  const isValidDomain = /^([a-zA-Z0-9.-]+\.)*[a-zA-Z]{2,}$/.test(domain);

  return {
    isValid: isValidFormat && hasAtSymbol && isValidDomain && !hasSpaces,
    errors: {
      formatError: !isValidFormat ? "Email address format is invalid. " : "",
      atSymbolError: !hasAtSymbol ? 'Email address must contain an "@".' : "",
      domainError: !isValidDomain ? "Invalid domain name in email address." : "",
      spaceError: hasSpaces ? "Email address must not contain spaces." : "",
    },
  };
};
