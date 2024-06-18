import { getProjectHost } from "../../helpers/getsAPI";

export async function useDiscountCodeById(id: string) {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${tokenType} ${token}`);
  const host = getProjectHost();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as const,
  };
  try {
    const response = await fetch(`${host}/cart-discounts/${id}`, requestOptions);

    const result = await response.text();
    const json = JSON.parse(result);
    return json;
  } catch (error) {
    console.log(error);
  }
}
