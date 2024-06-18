export async function getCategoryById(id: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as const,
  };

  try {
    const response = await fetch(
      `https://api.us-central1.gcp.commercetools.com/rsschool-asdaasd/categories/${id}`,
      requestOptions,
    );
    const result = await response.text();
    const json = JSON.parse(result);
    return json;
  } catch (error) {
    console.error(error);
  }
}
