import { apiChangeEmail } from "../../apiRequests/change/apiChangeEmail";
import { ProfileChangeModalWindow } from "../creators/profile/profileChangeModalWindow";

export async function changeEmail(email: string): Promise<boolean> {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let result = true;
  if (!emailPattern.test(email)) {
    result = false;
  }

  if (!result) {
    ProfileChangeModalWindow(result, "Changes were not saved", "Write true e-mail");
    return result;
  }

  const customerId = localStorage.getItem("customerId");
  if (!customerId) return false;

  const newEmail = await apiChangeEmail(customerId, email);
  //TODO: добавить уведомление об занятом email
  if (newEmail.statusCode === 400) {
    ProfileChangeModalWindow(false, "Changes were not saved", "This email is already in use");
  } else {
    ProfileChangeModalWindow(result, "Changes saved", "");
  }
  return true;
}
