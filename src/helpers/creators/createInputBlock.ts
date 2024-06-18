import { createElement } from "./createElement";
import { createInput } from "./createInput";

export function createInputBlock(
  labelText: string,
  idInput: string,
  inputType: string,
  requireq: boolean,
  placeholder?: string,
): HTMLElement {
  const block = createElement("div", "inform-block");
  const label = createElement("label", "label-registration") as HTMLLabelElement;
  label.classList.add(`label-${idInput}`);
  label.htmlFor = idInput;
  label.textContent = labelText;

  const input = createInput(inputType, "input-inform_registration", idInput, idInput, requireq);
  input.classList.add(`input__${idInput}`);
  if (placeholder) {
    input.placeholder = placeholder;
  }
  block.append(input, label);
  return block;
}
