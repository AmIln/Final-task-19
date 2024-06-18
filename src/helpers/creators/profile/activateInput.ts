export function activateInput(input: HTMLElement): void {
  const inputs = input.parentNode?.querySelectorAll("input");
  const selects = input.parentNode?.querySelectorAll("select");

  inputs?.forEach((input) => {
    input.disabled ? (input.disabled = false) : (input.disabled = true);
  });

  selects?.forEach((select) => {
    select.disabled ? (select.disabled = false) : (select.disabled = true);
  });
}
