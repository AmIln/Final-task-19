import { getProjectHost } from "../../../helpers/getsAPI";
import { Promotion } from "../../../helpers/interfaces/Promotion";

export async function getPromocodeById(id: string): Promise<Promotion | false> {
  const myHeaders = new Headers();
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token-type");
  myHeaders.append("Authorization", `${tokenType} ${token}`);
  const host = getProjectHost();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as const,
  };

  try {
    const response = await fetch(`${host}/discount-codes/${id}`, requestOptions);
    const result = await response.text();
    const json = JSON.parse(result) as Promotion;

    return json;
  } catch (error) {
    console.log(error);
    return false;
  }
}
