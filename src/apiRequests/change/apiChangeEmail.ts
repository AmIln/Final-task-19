import { getProjectHost } from "../../helpers/getsAPI";
import { getCustomerById } from "../getCustomerById";

export async function apiChangeEmail(idCustomer: string, email: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `${sessionStorage.getItem("token-type")} ${sessionStorage.getItem("token")}`);
  const host = getProjectHost();

  const customer = await getCustomerById(idCustomer);
  const VERSION = customer.version;

  const raw = JSON.stringify({
    version: VERSION || 3,
    actions: [
      {
        action: "changeEmail",
        email: email,
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow" as const,
  };

  try {
    const response = await fetch(`${host}/customers/${idCustomer}`, requestOptions);

    const result = await response.text();
    const json = JSON.parse(result);
    return json;
  } catch (error) {
    console.log(error);
  }
}
