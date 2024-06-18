//import { SetDefaultShippingAddress } from "./SetDefaultShippingAddress";
import { getCustomerById } from "../getCustomerById";

export async function deleteAddressId(id: string, addressId: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `${sessionStorage.getItem("token-type")} ${sessionStorage.getItem("token")}`);

  const customer = await getCustomerById(id);
  const VERSION = customer.version;

  const raw = JSON.stringify({
    version: VERSION || 2,
    actions: [
      {
        action: "removeAddress",
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
    /*const useDefaulth = document.getElementById("defaulth-shipping") as HTMLInputElement;
    if (useDefaulth.checked) {
      const setDefaulth = SetDefaultShippingAddress(id, addressId);
      try {
        await setDefaulth;
        return json;
      } catch (error) {
        console.log(error);
      }
    }*/
    return json;
  } catch (error) {
    console.log(error);
  }
}
