import { getCustomerById } from "../getCustomerById";

export async function SetDefaultShippingAddress(id: string, addressId: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `${sessionStorage.getItem("token-type")} ${sessionStorage.getItem("token")}`);

  const customer = await getCustomerById(id);
  const VERSION = customer.version;

  const raw = JSON.stringify({
    version: VERSION || 2,
    actions: [
      {
        action: "setDefaultShippingAddress",
        addressId: addressId,
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
