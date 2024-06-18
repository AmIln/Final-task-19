import { createElement } from "../../helpers/creators/createElement";

export function buyLoading(parrent: HTMLElement): void {
  const loadingWrapper = createElement("div", "buy-loading");
  const loader = createElement("div", "buy-loader");

  loadingWrapper.append(loader);
  parrent.append(loadingWrapper);
}

export function buyLoadingOn(loadWrapper: HTMLElement): void {
  const load = loadWrapper.querySelector(".buy-loading") as HTMLDivElement;
  if (!load.classList.contains("buy-loading__active")) {
    load.classList.add("buy-loading__active");
  }
}
export function buyLoadingOff(loadWrapper: HTMLElement): void {
  const load = loadWrapper.querySelector(".buy-loading") as HTMLDivElement;
  if (load.classList.contains("buy-loading__active")) {
    load.classList.remove("buy-loading__active");
  }
}
