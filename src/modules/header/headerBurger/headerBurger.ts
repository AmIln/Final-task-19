import { createElement } from "../../../helpers/creators/createElement";
import { createLink } from "../../../helpers/creators/createLink";
import { burgerStatus } from "./burgerStatus";
import { clearLocalStorage } from "../../../helpers/clearLocalStorage";
import { route } from "../../../router/route";

export function headerBurger(parrent: HTMLElement): void {
  const burgerButtonParent = createElement("button", "burger-button-parent");
  const burgerButton = createElement("div", "burger-button");
  const nav = createElement("nav", "nav-burger");
  const list = createElement("ul", "nav-burger__list");

  const itemMain = createElement("li", "nav-burger__item");
  const linkMain = createLink("nav-burger__link", "", false);
  itemMain.append(linkMain);
  linkMain.textContent = "Main";
  linkMain.addEventListener("click", (event: Event) => {
    event.preventDefault();
    burgerStatus();
    route(linkMain.href);
  });

  const itemBasket = createElement("li", "nav-burger__item");
  const linkBasket = createLink("nav-burger__link", "#basket", false);
  itemBasket.append(linkBasket);
  linkBasket.textContent = "Basket";
  linkBasket.addEventListener("click", (event: Event) => {
    event.preventDefault();
    burgerStatus();
    route(linkBasket.href);
  });

  const itemCategories = createElement("li", "nav-burger__item");
  const linkCategories = createLink("nav-burger__link", "#categories", false);
  itemCategories.append(linkCategories);
  linkCategories.textContent = "Categories";
  linkCategories.addEventListener("click", (event: Event) => {
    event.preventDefault();
    burgerStatus();
    route(linkCategories.href);
  });

  const itemAboutUs = createElement("li", "nav-burger__item");
  const linkAboutUs = createLink("nav-burger__link", "#aboutUs", false);
  itemAboutUs.append(linkAboutUs);
  linkAboutUs.textContent = "About us";
  linkAboutUs.addEventListener("click", (event: Event) => {
    event.preventDefault();
    burgerStatus();
    route(linkAboutUs.href);
  });

  const itemProfile = createElement("li", "nav-burger__item");
  itemProfile.classList.add("nav-burger__item_profile");
  if (!localStorage.getItem("customerId")) {
    itemProfile.classList.add("nav-burger__item_disable");
  }
  const linkProfile = createLink("nav-burger__link", "#profile", false);
  itemProfile.append(linkProfile);
  linkProfile.textContent = "Profile";
  linkProfile.addEventListener("click", (event: Event) => {
    event.preventDefault();
    burgerStatus();
    route(linkProfile.href);
  });

  const itemRegistration = createElement("li", "nav-burger__item");
  itemRegistration.classList.add("nav-burger__item_registration");
  const linkRegistration = createLink("nav-burger__link", "#registration", false);
  itemRegistration.append(linkRegistration);
  linkRegistration.textContent = "Registration";
  linkRegistration.addEventListener("click", (event: Event) => {
    event.preventDefault();
    burgerStatus();
    route(linkRegistration.href);
  });

  const itemLogin = createElement("li", "nav-burger__item");
  itemLogin.classList.add("nav-burger__item_login");
  const linkLogin = createLink("nav-burger__link", "#login", false);
  itemLogin.append(linkLogin);
  linkLogin.textContent = "Login";
  linkLogin.addEventListener("click", (event: Event) => {
    event.preventDefault();
    burgerStatus();
    route(linkLogin.href);
  });

  const itemLogout = createElement("li", "nav-burger__item");
  itemLogout.classList.add("nav-burger__item_logout", "nav-burger__item_disable");
  const linkLogout = createLink("nav-burger__link", "#logout", false);
  itemLogout.append(linkLogout);
  linkLogout.textContent = "Logout";
  linkLogout.addEventListener("click", async (event: Event) => {
    event.preventDefault();
    burgerStatus();
    await clearLocalStorage();
    route(window.location.origin);
  });

  burgerButtonParent.addEventListener("click", () => {
    burgerStatus();
  });

  list.append(itemMain, itemCategories, itemBasket, itemAboutUs, itemProfile, itemRegistration, itemLogin, itemLogout);
  nav.append(list);
  parrent.append(burgerButtonParent);
  burgerButtonParent.append(burgerButton);
  parrent.append(nav);
}
