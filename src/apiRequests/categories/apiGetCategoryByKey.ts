import { Category } from "../../helpers/interfaces/Category";

export async function apiGetCategoryByKey(key: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${sessionStorage.getItem("token-type")} ${sessionStorage.getItem("token")}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as const,
  };

  try {
    const response = await fetch(
      `https://api.us-central1.gcp.commercetools.com/rsschool-asdaasd/categories/key=${key}`,
      requestOptions,
    );
    const result = await response.text();
    const json = JSON.parse(result) as Category;
    return json;
  } catch (error) {
    console.log(error);
  }
}
