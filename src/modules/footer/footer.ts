import { createElement } from "../../helpers/creators/createElement";
import { createLink } from "../../helpers/creators/createLink";
const styles = require("./footer.module.scss");

export function createFooter(parrent: HTMLBodyElement): void {
  const footer = createElement("footer", styles.footer);
  const creatorsBlock = createElement("div", "creators");
  const creatorsText = createElement("span", "creators__text", "Creators:");
  const Ivan = createLink("creator", "https://github.com/ivankritsckii", true);
  Ivan.textContent = "Ivan";
  const Marta = createLink("creator", "https://github.com/Marta109", true);
  Marta.textContent = "Marta";
  const Dmitry = createLink("creator", "https://github.com/AmIln", true);
  Dmitry.textContent = "Dmitry";
  const year = createElement("span", "year", "2024");

  creatorsBlock.append(creatorsText, Ivan, Marta, Dmitry);
  footer.append(creatorsBlock, year);
  parrent.append(footer);
}
