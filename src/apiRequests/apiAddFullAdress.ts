import { getProjectHost } from "../helpers/getsAPI";
import { getCustomerById } from "./getCustomerById";

export async function apiAddFullAdress(
  id: string,
  country: string,
  city: string,
  postcode: string,
  street: string,
  building: string,
  apartment: string,
) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `${sessionStorage.getItem("token-type")} ${sessionStorage.getItem("token")}`);
  const host = getProjectHost();

  const email = document.getElementById("inform__email") as HTMLInputElement;
  const name = document.getElementById("inform__name") as HTMLInputElement;
  const surname = document.getElementById("inform__lastName") as HTMLInputElement;

  const customer = await getCustomerById(id);
  const VERSION = customer.version;

  const raw = JSON.stringify({
    version: VERSION || 1,
    actions: [
      {
        action: "addAddress",
        address: {
          email: email.value,
          firstName: name.value,
          lastName: surname.value,
          country: country,
          city: city,
          postalCode: postcode,
          streetName: street,
          building: building,
          apartment: apartment,
        },
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
    const response = await fetch(`${host}/customers/${id}`, requestOptions);

    const result = await response.text();
    const json = JSON.parse(result);
    return json;
  } catch (error) {
    console.log(error);
  }
}
