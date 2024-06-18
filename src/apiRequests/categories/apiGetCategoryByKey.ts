import { getProjectHost } from "../../helpers/getsAPI";
import { Category } from "../../helpers/interfaces/Category";

export async function apiGetCategoryByKey(key: string) {
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
    const response = await fetch(`${host}/categories/key=${key}`, requestOptions);

    const result = await response.text();
    const json = JSON.parse(result) as Category;
    return json;
  } catch (error) {
    console.log(error);
  }
}
