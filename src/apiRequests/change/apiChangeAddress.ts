import { getCustomerById } from "../getCustomerById";

export async function apiChangeAddress(
  idCustomer: string,
  addressId: string,
  country: string,
  city: string,
  postcode: string,
  street: string,
  house: string,
  apartment: string,
) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `${sessionStorage.getItem("token-type")} ${sessionStorage.getItem("token")}`);

  const customer = await getCustomerById(idCustomer);
  const VERSION = customer.version;

  const raw = JSON.stringify({
    version: VERSION,
    actions: [
      {
        action: "changeAddress",
        addressId: addressId,
        address: {
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          country: country,
          city: city,
          postalCode: postcode,
          streetName: street,
          building: house,
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
      `https://api.us-central1.gcp.commercetools.com/rsschool-asdaasd/customers/${idCustomer}`,
      requestOptions,
    );
    const result = await response.text();
    const json = JSON.parse(result);
    return json;
  } catch (error) {
    console.log(error);
  }
}
