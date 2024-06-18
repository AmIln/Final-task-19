const styles = require("./loading.module.scss");
import { createElement } from "../../helpers/creators/createElement";

export function createLoading(parrent: HTMLElement): void {
  const loadingWrapper = createElement("div", styles["loading-wrapper"]);
  const loader = createElement("div", styles.loader);

  loadingWrapper.append(loader);
  parrent.append(loadingWrapper);
}

export function loading(): void {
  const load = document.querySelector(".loading-wrapper") as HTMLDivElement;
  if (!load.classList.contains("loading-wrapper__active")) {
    load.classList.add("loading-wrapper__active");
  }
  setTimeout(() => {
    load.classList.remove("loading-wrapper__active");
  }, 300);
}
