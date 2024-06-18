import { getProjectHost } from "../helpers/getsAPI";

export async function apiSearchProductsByGet(text: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
  const host = getProjectHost();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as const,
  };

  try {
    const response = await fetch(
      `${host}/product-projections/search?fuzzy=true&limit=100&isSearchable=true&staged=true&markMatchingVariants=true&mustMatch=any&caseInsensitive=true&text.en=${text}`,
      requestOptions,
    );
    const result = await response.text();
    const json = JSON.parse(result);
    return json;
  } catch (error) {
    console.error(error);
  }
}
