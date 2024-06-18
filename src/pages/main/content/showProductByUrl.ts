import { apiGetProducts } from "../../../apiRequests/apiGetProducts";
import { createSingleProductPage } from "../../product/createSingleProductPage";

export async function showProductByUrl(url: string): Promise<void> {
  const products = await apiGetProducts();

  if (products) {
    const data = JSON.parse(products as string).results;
    for (let i = 0; i < data.length; i++) {
      const elementUrl = data[i].masterData.current.slug.en;
      if (url === elementUrl) {
        const content = document.getElementById("content");
        if (content) {
          createSingleProductPage(data[i]);
          break;
        }
      }
    }
  }
}
