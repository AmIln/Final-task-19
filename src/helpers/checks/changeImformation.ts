import { changeEmail } from "../change/changeEmail";
import { changeName } from "../change/changeName";
import { changeSurname } from "../change/changeSurname";
import { changeBirth } from "../change/changeBirth";
import { changePassword } from "../change/changePassword";

export function changeImformation(idInput: string): void {
  const input = document.getElementById(idInput) as HTMLInputElement;

  const comands = {
    inform__email: () => changeEmail(input.value),
    inform__name: () => changeName(input.value),
    inform__lastName: () => changeSurname(input.value),
    inform__birth: () => changeBirth(input.value),
    inform__password: () => changePassword(input.value),
  } as unknown as { [key: string]: () => boolean };

  comands[idInput] && comands[idInput]();
}
