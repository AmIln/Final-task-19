import { getCustomerById } from "./getCustomerById";

export async function apiAddAdress(id: string, street: string, building: string, apartment: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `${sessionStorage.getItem("token-type")} ${sessionStorage.getItem("token")}`);

  const email = document.getElementById("input-email") as HTMLInputElement;
  const name = document.getElementById("input-name") as HTMLInputElement;
  const surname = document.getElementById("input-surname") as HTMLInputElement;
  const country = document.getElementById("country") as HTMLSelectElement;
  const city = document.getElementById("city") as HTMLInputElement;
  const postcode = document.getElementById("postcode") as HTMLInputElement;

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
          country: country.value,
          city: city.value,
          postalCode: postcode.value,
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
    const response = await fetch(
      `https://api.us-central1.gcp.commercetools.com/rsschool-asdaasd/customers/${id}`,
      requestOptions,
    );
    const result = await response.text();
    const json = JSON.parse(result);
    return json;
  } catch (error) {
    console.log(error);
  }
}
