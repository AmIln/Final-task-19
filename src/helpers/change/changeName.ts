import { apiChangeName } from "../../apiRequests/change/apiChangeName";
import { ProfileChangeModalWindow } from "../creators/profile/profileChangeModalWindow";

export async function changeName(name: string): Promise<boolean> {
  console.log(name);
  const pattern = /^[A-Z][a-zA-Z]{2,}$/;
  let result = true;
  if (!pattern.test(name)) {
    result = false;
  }

  if (!result) {
    ProfileChangeModalWindow(
      result,
      "Changes were not saved",
      "The name must begin with a capital letter. The name must be at least 2 characters long. The name must consist of letters of the English alphabet",
    );
    return result;
  }

  const customerId = localStorage.getItem("customerId");
  if (!customerId) return false;

  ProfileChangeModalWindow(result, "Changes saved", "");
  await apiChangeName(customerId, name);
  return true;
}
