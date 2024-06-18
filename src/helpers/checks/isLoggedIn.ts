export function isLoggedIn(): boolean {
  const access = localStorage.getItem("access_token");
  const logIn = document.querySelector(".logIn__bth") as HTMLLIElement;
  const logOut = document.querySelector(".logOut__bth") as HTMLLIElement;
  const registration = document.querySelector(".registration__btn") as HTMLLIElement;
  const burgerRegistration = document.querySelector(".nav-burger__item_registration") as HTMLLIElement;
  const burgerLogin = document.querySelector(".nav-burger__item_login") as HTMLLIElement;
  const burgerLogout = document.querySelector(".nav-burger__item_logout") as HTMLLIElement;
  const notPageLogin = document.querySelector(".notPage-item_login") as HTMLLIElement;
  const notPageLogout = document.querySelector(".notPage-item_logout") as HTMLLIElement;
  const notPageRegistration = document.querySelector(".notPage-item_registration") as HTMLLIElement;
  const profile = document.querySelector(".profile__btn") as HTMLLIElement;
  const burgerProfile = document.querySelector(".nav-burger__item_profile") as HTMLLIElement;

  if (access) {
    logIn?.classList.add("nav__item_disable");
    registration?.classList.add("nav__item_disable");
    burgerRegistration?.classList.add("nav-burger__item_disable");
    burgerLogin?.classList.add("nav-burger__item_disable");
    notPageLogin?.classList.add("notPage-item_disable");
    notPageRegistration?.classList.add("notPage-item_disable");

    logOut?.classList.remove("nav__item_disable");
    burgerLogout?.classList.remove("nav-burger__item_disable");
    notPageLogout?.classList.remove("notPage-item_disable");
    profile.classList.remove("nav__item_disable");
    burgerProfile.classList.remove("nav-burger__item_disable");
    return true;
  } else {
    logIn?.classList.remove("nav__item_disable");
    registration?.classList.remove("nav__item_disable");
    burgerRegistration?.classList.remove("nav-burger__item_disable");
    burgerLogin?.classList.remove("nav-burger__item_disable");
    notPageLogin?.classList.remove("notPage-item_disable");
    notPageRegistration?.classList.remove("notPage-item_disable");

    logOut?.classList.add("nav__item_disable");
    burgerLogout?.classList.add("nav-burger__item_disable");
    notPageLogout?.classList.add("notPage-item_disable");
    profile.classList.add("nav__item_disable");
    burgerProfile.classList.add("nav-burger__item_disable");
    return false;
  }
}
