export function createInput(
  type: string,
  className: string,
  name: string,
  id?: string,
  required = true,
  minLength = 0,
  title = "",
): HTMLInputElement {
  const input = document.createElement("input");
  input.classList.add(className);
  input.type = type;
  input.name = name;
  if (id) input.id = id;
  input.required = required;
  if (minLength) {
    input.minLength = minLength;
  }
  if (title) {
    input.title = title;
  }
  return input;
}
