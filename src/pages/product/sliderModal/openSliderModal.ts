import { changeSlide } from "../slider/changeSlide";

export function openSliderModal(): void {
  const slide = document.querySelectorAll<HTMLInputElement>(".productPageWrapper .slides");
  const modal = document.querySelector(".modalWrapper") as HTMLElement;
  const modalSlide = modal.querySelectorAll<HTMLInputElement>(".slides");
  const controllers = modal.querySelectorAll<HTMLInputElement>(".controller");

  slide.forEach((el, index) => {
    el.addEventListener("click", () => {
      modalSlide.forEach((slide) => slide.classList.remove("active"));
      modalSlide[index].classList.add("active");
      controllers.forEach((controller) => (controller.checked = false));
      controllers[index].checked = true;
      modal.classList.add("active");
      changeSlide(".modalContent");
    });
  });
}
