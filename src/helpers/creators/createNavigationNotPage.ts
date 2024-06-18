import { createElement } from "./createElement";
import { createLink } from "./createLink";
import { clearLocalStorage } from "../clearLocalStorage";
import { route } from "../../router/route";

export function createNavigationNotPage(): HTMLElement {
  const navigation = createElement("nav", "notPage-navigation");
  const list = createElement("ul", "notPage-list");
  const itemMain = createElement("li", "notPage-item");
  const linkMain = createLink("notPage-link", "", false);
  linkMain.textContent = "Main";
  itemMain.append(linkMain);

  const itemCategories = createElement("li", "notPage-item");
  itemCategories.classList.add("notPage-item");
  const linkCategories = createLink("notPage-link", "#categories", false);
  linkCategories.textContent = "Categories";
  itemCategories.append(linkCategories);

  const itemLogin = createElement("li", "notPage-item");
  itemLogin.classList.add("notPage-item_login");
  const linkLogin = createLink("notPage-link", "#login", false);
  linkLogin.textContent = "Login";
  itemLogin.append(linkLogin);

  const itemRegistration = createElement("li", "notPage-item");
  itemRegistration.classList.add("notPage-item_registration");
  const linkRegistration = createLink("notPage-link", "#registration", false);
  linkRegistration.textContent = "Registration";
  itemRegistration.append(linkRegistration);

  const itemLogout = createElement("li", "notPage-item");
  itemLogout.classList.add("notPage-item_logout", "notPage-item_disable");
  const linkLogout = createLink("notPage-link", "#logout", false);
  linkLogout.textContent = "Logout";
  itemLogout.append(linkLogout);
  linkLogout.addEventListener("click", (event: Event) => {
    event.preventDefault();
    clearLocalStorage();
    route(window.location.href);
  });

  const itemAboutUs = createElement("li", "notPage-item");
  const linkAboutUs = createLink("notPage-link", "#aboutUs", false);
  linkAboutUs.textContent = "About us";
  itemAboutUs.append(linkAboutUs);
  list.append(itemMain, itemCategories, itemLogin, itemRegistration, itemAboutUs, itemLogout);
  navigation.append(list);
  return navigation;
}
