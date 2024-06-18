export function burgerStatus(): void {
  const body = document.body as HTMLBodyElement;
  const button = document.querySelector(".burger-button") as HTMLDivElement;
  const nav = document.querySelector(".nav-burger") as HTMLElement;
  const list = document.querySelector(".nav-burger__list") as HTMLLIElement;

  body.classList.toggle("no-scroll");
  button.classList.toggle("burger-button_active");
  nav.classList.toggle("nav-burger_active");
  list.classList.toggle("nav-burger__list_active");
}
