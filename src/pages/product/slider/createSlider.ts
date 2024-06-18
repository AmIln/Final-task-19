export function createSlider(data: Array<{ url: string }>): HTMLElement {
  const sliderWrapper: HTMLDivElement = document.createElement("div");
  sliderWrapper.className = "sliderWrapper";
  const sliderControllerWrapper: HTMLDivElement = document.createElement("div");
  sliderControllerWrapper.className = "sliderControllerWrapper";

  data.forEach((el, i) => {
    const img = document.createElement("img");
    img.src = el.url;
    img.alt = "Product img";
    img.className = i === 0 ? "slides active" : "slides";
    sliderWrapper.appendChild(img);
    const controller = document.createElement("input");
    controller.id = `controller${i + 1 + Math.random()}`;
    controller.className = "controller";
    controller.type = "radio";
    if (i === 0) controller.checked = true;
    const label = document.createElement("label");
    label.setAttribute("for", `${controller.id}`);
    sliderControllerWrapper.append(controller, label);
  });

  for (let i = 0; i < 2; i++) {
    const arrow = document.createElement("div");
    arrow.className = `arrow ${i === 0 ? "arrow-left" : "arrow-right"}`;
    arrow.innerHTML = `<i class="fa-solid fa-chevron-${i === 0 ? "left" : "right"}"></i>`;
    sliderWrapper.append(arrow);
  }
  sliderWrapper.append(sliderControllerWrapper);

  return sliderWrapper;
}
