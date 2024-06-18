import { getCustomerById } from "../getCustomerById";
import { ProfileChangeModalWindow } from "../../helpers/creators/profile/profileChangeModalWindow";
import { getProjectHost } from "../../helpers/getsAPI";

export async function apiChangePassword(idCustomer: string, password: string, newPassword: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `${sessionStorage.getItem("token-type")} ${sessionStorage.getItem("token")}`);
  const host = getProjectHost();

  const customer = await getCustomerById(idCustomer);
  const VERSION = customer.version;

  const raw = JSON.stringify({
    id: idCustomer,
    version: VERSION,
    currentPassword: password,
    newPassword: newPassword,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow" as const,
  };

  try {
    const response = await fetch(`${host}/customers/password`, requestOptions);

    const result = await response.text();
    const json = JSON.parse(result);
    if (json.statusCode === 400) {
      ProfileChangeModalWindow(false, "Changes were not saved", "Enter your password");
    } else {
      ProfileChangeModalWindow(true, "Changes saved", "");
    }
    return json;
  } catch (error) {
    console.log(error);
  }
}
