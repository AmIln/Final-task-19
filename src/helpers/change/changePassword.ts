import { apiChangePassword } from "../../apiRequests/change/apiChangePassword";
import { ProfileChangeModalWindow } from "../creators/profile/profileChangeModalWindow";

export async function changePassword(password: string): Promise<boolean> {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const newPasswordInput = document.getElementById("inform__new-password") as HTMLInputElement;
  let result = true;
  if (!passwordPattern.test(password)) {
    //TODO: добавить уведомление, что старый пароль не подходит под паттерн
    ProfileChangeModalWindow(false, "Changes were not saved", "You entered the wrong password");
    result = false;
  }
  if (!passwordPattern.test(newPasswordInput.value)) {
    //TODO: добавить уведомление, что новый пароль не подходит под паттерн
    ProfileChangeModalWindow(
      false,
      "Changes were not saved",
      "The new password must be at least 8 characters. Must include uppercase and lowercase letters of the English alphabet",
    );
    result = false;
  }

  const customerId = localStorage.getItem("customerId");
  if (!customerId) return false;

  if (!result) return result;
  await apiChangePassword(customerId, password, newPasswordInput.value);
  return result;
}
