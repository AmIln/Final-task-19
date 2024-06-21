import { Promotion } from "../interfaces/Promotion";
import { createElement } from "./createElement";
const styles = require("./promocode.module.scss");

export async function createPromocodes(promocodes: [Promotion], parent?: HTMLElement): Promise<string[]> {
  const promocodesArray: string[] = [];

  promocodes.forEach((item) => {
    if (!item.isActive) return;
    if (parent) {
      const promocodeWrapper = createElement("div", styles.promocode);
      const descrPromocode = createElement("span", "promocode__description", item.description.en);
      const promocodeKey = createElement("span", styles.promocode__key, item.key);

      promocodeKey.addEventListener("click", () => {
        if (!promocodeKey.textContent) return;
        navigator.clipboard.writeText(promocodeKey.textContent).then(() => {
          showCopyPromocodes(promocodeKey);
        });
      });

      promocodeWrapper.append(descrPromocode, promocodeKey);
      parent.append(promocodeWrapper);
    }

    promocodesArray.push(item.key);
  });

  return promocodesArray;
}

function showCopyPromocodes(span: HTMLElement): void {
  span.classList.add("promocode__key_active");
  setTimeout(() => {
    span.classList.remove("promocode__key_active");
  }, 1000);
}
