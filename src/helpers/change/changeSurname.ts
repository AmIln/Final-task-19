import { apiChangeSurname } from "../../apiRequests/change/apiChangeSurname";
import { ProfileChangeModalWindow } from "../creators/profile/profileChangeModalWindow";

export async function changeSurname(surname: string): Promise<boolean> {
  const pattern = /^[A-Z][a-zA-Z]{2,}$/;
  let result = true;
  if (!pattern.test(surname)) {
    result = false;
  }

  if (!result) {
    ProfileChangeModalWindow(
      result,
      "Changes were not saved",
      "The last name must begin with a capital letter. The last name must be at least 2 characters long. The name must consist of letters of the English alphabet",
    );
    return result;
  }

  const customerId = localStorage.getItem("customerId");
  if (!customerId) {
    ProfileChangeModalWindow(
      result,
      "Changes were not saved",
      "The last name must begin with a capital letter. The last name must be at least 2 characters long. The name must consist of letters of the English alphabet",
    );
    return false;
  }

  ProfileChangeModalWindow(result, "Changes saved", "");
  await apiChangeSurname(customerId, surname);
  return true;
}
