import { createElement } from "../../helpers/creators/createElement";
import { createImage } from "../../helpers/creators/createImage";
import { createNavigationNotPage } from "../../helpers/creators/createNavigationNotPage";
import { isLoggedIn } from "../../helpers/checks/isLoggedIn";
const styles = require("./404.module.scss");

export function notPage() {
  const content = document.getElementById("content") as HTMLDivElement;
  content.innerHTML = "";

  const container = createElement("div", styles["notPage-container"]);
  const title = createElement("h1", styles["notPage-title"], "This page does not exist");
  const description = createElement(
    "p",
    styles["notPage-description"],
    "No signal here! We can't find this page that you are looking for.",
  );
  const descriptionNav = createElement("p", styles["notPage-description"], "Please follow the links below:");

  const navigation = createNavigationNotPage();

  const image = createImage(
    styles["notPage-image"],
    "https://cs11.pikabu.ru/post_img/2020/03/17/4/1584421566125394075.gif",
    "404 image",
    500,
    480,
  );

  container.append(title, description, descriptionNav, navigation, image);
  content.append(container);
  isLoggedIn();
}
