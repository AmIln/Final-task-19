import { isOlderThan13 } from "../checks/checkBirth";
import { apiChangeBirth } from "../../apiRequests/change/apiChangeBirth";
import { ProfileChangeModalWindow } from "../creators/profile/profileChangeModalWindow";

export async function changeBirth(birth: string): Promise<boolean> {
  const birthPattern = /^(19|20)\d\d[- /.](0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])$/;
  let result = true;
  if (!birthPattern.test(birth)) {
    result = false;
  }

  if (!result) {
    ProfileChangeModalWindow(false, "Changes were not saved", "Enter your date of birth");
    return false;
  }
  if (!isOlderThan13(birth)) {
    ProfileChangeModalWindow(false, "Changes were not saved", "User must be older then 13");
    return false;
  }

  const customerId = localStorage.getItem("customerId");
  if (!customerId) return false;

  ProfileChangeModalWindow(result, "Changes saved", "");
  await apiChangeBirth(customerId, birth);
  return true;
}
