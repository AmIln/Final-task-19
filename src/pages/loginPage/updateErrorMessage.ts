export const updateErrorMessage = (
  errorElement: HTMLDivElement,
  validationResult: { isValid: boolean; errors: Record<string, string> },
  defaultMessage: string = "",
) => {
  if (validationResult.isValid) {
    errorElement.textContent = "";
  } else {
    errorElement.innerHTML = defaultMessage ? `<div>${defaultMessage}</div>` : "";
    for (const error in validationResult.errors) {
      errorElement.innerHTML += `<div>${validationResult.errors[error]}</div>`;
    }
  }
};
