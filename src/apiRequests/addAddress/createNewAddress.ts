import { getCustomerById } from "../getCustomerById";

export async function createNewAddress(customerId: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `${sessionStorage.getItem("token-type")} ${sessionStorage.getItem("token")}`);

  const country = document.getElementById("country") as HTMLInputElement;
  const city = document.getElementById("create-inform__city") as HTMLInputElement;
  const postalCode = document.getElementById("create-inform__postcode") as HTMLInputElement;
  const street = document.getElementById("create-inform__street") as HTMLSelectElement;
  const building = document.getElementById("create-inform__house") as HTMLInputElement;
  const apartment = document.getElementById("create-inform__apartment") as HTMLInputElement;

  const customer = await getCustomerById(customerId);
  const VERSION = customer.version;

  const raw = JSON.stringify({
    version: VERSION || 1,
    actions: [
      {
        action: "addAddress",
        address: {
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          country: country.value,
          city: city.value,
          postalCode: postalCode.value,
          streetName: street.value,
          building: building.value,
          apartment: apartment.value,
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
      `https://api.us-central1.gcp.commercetools.com/rsschool-asdaasd/customers/${customerId}`,
      requestOptions,
    );
    const result = await response.text();
    const json = JSON.parse(result);
    return json;
  } catch (error) {
    console.log(error);
  }
}
