import { getProjectHost } from "../../helpers/getsAPI";

export async function createCart() {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);
  const host = getProjectHost();

  if (sessionStorage.getItem("cartId")) return;

  const raw = JSON.stringify({
    currency: "USD",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow" as const,
  };

  try {
    const response = await fetch(`${host}/carts`, requestOptions);

    const result = await response.text();
    const json = JSON.parse(result);
    sessionStorage.setItem("cartId", json.id);

    return json;
  } catch (error) {
    console.log(error);
    return null;
  }
}
