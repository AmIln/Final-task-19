import { headerBurger } from "./headerBurger/headerBurger";
import { createElement } from "../../helpers/creators/createElement";
import { createLink } from "../../helpers/creators/createLink";
import { route } from "../../router/route";
import { clearLocalStorage } from "../../helpers/clearLocalStorage";
import { createQualityInBasket } from "../../helpers/creators/createQuantityInBasket";
const styles = require("./header.module.scss");

export function createHeader(parrent: HTMLElement): void {
  parrent.innerHTML = ``;
  const header = createElement("header", styles.header);
  const nav = createElement("nav", "nav");
  const list = createElement("ul", "nav__list");

  const itemMain = createElement("li", "nav__item");
  const linkMain = createLink("nav__link", "", false);
  itemMain.append(linkMain);
  linkMain.textContent = "Main";
  linkMain.addEventListener("click", (event: Event) => {
    event.preventDefault();
    route(linkMain.href);
  });

  const itemCategories = createElement("li", "nav__item");
  const linkCategories = createLink("nav__link", "#categories", false);
  itemCategories.append(linkCategories);
  linkCategories.textContent = "Categories";
  linkCategories.addEventListener("click", (event: Event) => {
    event.preventDefault();
    route(linkCategories.href);
  });

  const itemBasket = createElement("li", "nav__item");
  const linkBasket = createLink("nav__link", "#basket", false);
  itemBasket.append(linkBasket);
  const basketImg = document.createElement("img");
  basketImg.src = "./basket.svg";
  basketImg.alt = "basket";
  const countProductWraper = document.createElement("div");
  countProductWraper.classList.add("count_product_wraper");
  countProductWraper.innerHTML = `0`;
  linkBasket.append(basketImg, countProductWraper);
  //linkBasket.textContent = `${basketImg}`;
  linkBasket.addEventListener("click", (event: Event) => {
    event.preventDefault();
    route(linkBasket.href);
  });

  const itemAboutUs = createElement("li", "nav__item");
  const linkAboutUs = createLink("nav__link", "#aboutUs", false);
  itemAboutUs.append(linkAboutUs);
  linkAboutUs.textContent = "About us";
  linkAboutUs.addEventListener("click", (event: Event) => {
    event.preventDefault();
    route(linkAboutUs.href);
  });

  const itemProfile = createElement("li", "nav__item");
  itemProfile.classList.add("profile__btn");
  if (!localStorage.getItem("customerId")) {
    itemProfile.classList.add("nav__item_disable");
  }
  const linkProfile = createLink("nav__link", "#profile", false);
  itemProfile.append(linkProfile);
  linkProfile.textContent = "Profile";
  linkProfile.style.textDecoration = "underline";
  linkProfile.addEventListener("click", (event: Event) => {
    event.preventDefault();
    route(linkProfile.href);
  });

  const itemRegistration = createElement("li", "nav__item");
  itemRegistration.classList.add("registration__btn");
  if (localStorage.getItem("currentUserID")) itemRegistration.classList.add("nav__item_disable");
  const linkRegistration = createLink("nav__link", "#registration", false);
  itemRegistration.append(linkRegistration);
  linkRegistration.textContent = "Registration";
  linkRegistration.style.textDecoration = "underline";
  linkRegistration.addEventListener("click", (event: Event) => {
    event.preventDefault();
    route(linkRegistration.href);
  });

  const itemLogin = createElement("li", "nav__item");
  itemLogin.classList.add("logIn__bth");
  if (localStorage.getItem("currentUserID")) itemLogin.classList.add("nav__item_disable");
  const linkLogin = createLink("nav__link", "#login", false);
  itemLogin.append(linkLogin);
  linkLogin.textContent = "Login";
  linkLogin.style.textDecoration = "underline";
  linkLogin.addEventListener("click", (event: Event) => {
    event.preventDefault();
    route(linkLogin.href);
  });

  const itemLogout = createElement("li", "nav__item");
  itemLogout.classList.add("logOut__bth");
  if (!localStorage.getItem("currentUserID")) itemLogout.classList.add("nav__item_disable");
  const linkLogout = createLink("nav__link", "#logout", false);
  itemLogout.append(linkLogout);
  linkLogout.textContent = "Logout";
  linkLogout.style.textDecoration = "underline";
  linkLogout.addEventListener("click", async (event: Event) => {
    event.preventDefault();
    await clearLocalStorage();
    route(window.location.origin);
  });

  list.append(itemMain, itemCategories, itemBasket, itemAboutUs, itemProfile, itemRegistration, itemLogin, itemLogout);
  nav.append(list);
  header.append(nav);
  parrent.append(header);
  headerBurger(header);
  createQualityInBasket();
}
