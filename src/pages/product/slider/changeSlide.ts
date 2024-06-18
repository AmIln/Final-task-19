export function changeSlide(selector?: string): void {
  const parentElem = selector
    ? (document.querySelector(selector) as HTMLElement)
    : (document.querySelector(".productPageWrapper") as HTMLElement);
  const leftArrow = parentElem.querySelector(".arrow-left") as HTMLElement;
  const rightArrow = parentElem.querySelector(".arrow-right") as HTMLElement;
  const controllers = parentElem.querySelectorAll<HTMLInputElement>(".controller");

  leftArrow.addEventListener("click", () => {
    moveSlide(-1, parentElem);
  });

  rightArrow.addEventListener("click", () => {
    moveSlide(1, parentElem);
  });

  const keydownHandler = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      moveSlide(-1, parentElem);
    } else if (event.key === "ArrowRight") {
      moveSlide(1, parentElem);
    }
  };

  parentElem.addEventListener("mouseenter", () => {
    document.addEventListener("keydown", keydownHandler);
  });

  parentElem.addEventListener("mouseleave", () => {
    document.removeEventListener("keydown", keydownHandler);
  });

  controllers.forEach((controller, index) => {
    controller.addEventListener("click", () => {
      moveSlideController(index, parentElem);
    });
  });
}

function moveSlide(direction: number, parentElem: HTMLElement): void {
  const slides = parentElem.querySelectorAll(".slides");
  const controllers = parentElem.querySelectorAll<HTMLInputElement>(".controller");

  let currentIndex = Array.from(slides).findIndex((slide) => slide.classList.contains("active"));
  slides.forEach((slide) => slide.classList.remove("active"));
  controllers.forEach((controller) => (controller.checked = false));
  currentIndex = (currentIndex + direction + slides.length) % slides.length;
  slides[currentIndex].classList.add("active");
  controllers[currentIndex].checked = true;
}

function moveSlideController(index: number, parentElem: HTMLElement): void {
  const slides = parentElem.querySelectorAll(".slides");
  const controllers = parentElem.querySelectorAll<HTMLInputElement>(".controller");

  slides.forEach((slide) => slide.classList.remove("active"));
  controllers.forEach((controller) => (controller.checked = false));
  slides[index].classList.add("active");
  controllers[index].checked = true;
}
