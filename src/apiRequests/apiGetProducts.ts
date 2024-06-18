export async function apiGetProducts() {
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
      "https://api.us-central1.gcp.commercetools.com/rsschool-asdaasd/products?limit=100",
      requestOptions,
    );

    const result = await response.text();
    return result;
  } catch (error) {
    console.error(error);
  }
}
