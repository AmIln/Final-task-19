import { getProjectHost } from "../helpers/getsAPI";

export async function apiGetProducts() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${sessionStorage.getItem("token-type")} ${sessionStorage.getItem("token")}`);
  const host = getProjectHost();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as const,
  };

  try {
    const response = await fetch(`${host}/products?limit=100`, requestOptions);

    const result = await response.text();
    return result;
  } catch (error) {
    console.error(error);
  }
}
