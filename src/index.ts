import { apiInitialization } from "./apiRequests/apiInitialization";
import { createMain } from "./pages/main/createMain";
import { route } from "./router/route";
import { createHeader } from "./modules/header/header";
import { createFooter } from "./modules/footer/footer";
import { showProductByUrl } from "./pages/main/content/showProductByUrl";
import { isProductPage } from "./helpers/checks/isProductPage";
const styles = require("./pages/style.module.scss");

window.addEventListener("load", async () => {
  window.onhashchange = (event) => {
    route(event.newURL);
  };

  const body = document.body as HTMLBodyElement;
  if (body) {
    body?.classList.add(styles.body);
    const connect = apiInitialization();
    createHeader(body);
    createMain(body);
    createFooter(body);

    connect.then(() => {
      if (isProductPage()) {
        showProductByUrl(window.location.hash.replace("#", ""));
      } else {
        route(window.location.hash);
      }
    });
  }
});
