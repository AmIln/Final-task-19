import { createElement } from "../../helpers/creators/createElement";
import { createPromocodes } from "../../helpers/creators/createPromocodes";
import { getProjectHost } from "../../helpers/getsAPI";

export async function apiGetDiscountCodes(parent?: HTMLElement): Promise<string[] | undefined> {
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
    const response = await fetch(`${host}/discount-codes`, requestOptions);

    const result = await response.text();
    const json = JSON.parse(result);

    if (parent) {
      const promocodesTitle = createElement("h2", "promocodes-title", "Your promo codes:");
      parent.append(promocodesTitle);
      return await createPromocodes(json.results, parent);
    }

    return await createPromocodes(json.results);
  } catch (error) {
    console.log(error);
  }
}
