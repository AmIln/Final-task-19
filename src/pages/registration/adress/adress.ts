import { createElement } from "../../../helpers/creators/createElement";
import { createInputBlock } from "../../../helpers/creators/createInputBlock";
import { createSelectCountry } from "../../../helpers/creators/createSelectCountry";
import { choiseAddress } from "../../../helpers/creators/registration/choiseAddress";
const styles = require("./adress.module.scss");

export function addAdressBlock(parent: HTMLElement): void {
  const informBlock = createElement("div", styles.inform);

  const birthBlock = createInputBlock(
    "please select your date of birth, you must be over 13 years old",
    "birth",
    "date",
    true,
  );
  const countryBlock = createSelectCountry();
  const cityBlock = createInputBlock(
    "only latin, first letter capitalized, min 3 letters",
    "city",
    "text",
    true,
    "City",
  );
  const postcodeBlock = createInputBlock("size - 6, only number", "postcode", "number", true, "your postcode");

  const streetBlock = createInputBlock("min size - 4, numbers or letters", "street", "text", true, "Street name");

  const buildingBlock = createInputBlock(
    "min size - 4, numbers or letters",
    "building",
    "text",
    true,
    "House name/number",
  );

  const apartmentBlock = createInputBlock(
    "max size - 3, only numbers",
    "apartment",
    "number",
    true,
    "Apartment number",
  );

  const streetBlockBilling = createInputBlock(
    "min size - 4, numbers or letters",
    "street-billing",
    "text",
    false,
    "Street name",
  );

  const buildingBlockBilling = createInputBlock(
    "min size - 4, numbers or letters",
    "building-billing",
    "text",
    false,
    "House name/number",
  );

  const apartmentBlockBilling = createInputBlock(
    "max size - 3, only numbers",
    "apartment-billing",
    "number",
    false,
    "Apartment number",
  );
  const adressBlock = createElement("div", styles.adresses);
  const shipping = createElement("div", "shipping");
  shipping.classList.add(styles.adress);
  const shippingDescription = createElement("span", "shipping__description", "shipping adress");
  const billing = createElement("div", "billing");
  billing.classList.add(styles.adress);
  const billingDescription = createElement("span", "billing__description", "billing adress");

  const choise = choiseAddress();

  adressBlock.append(shipping, choise, billing);
  shipping.append(shippingDescription, streetBlock, buildingBlock, apartmentBlock);
  billing.append(billingDescription, streetBlockBilling, buildingBlockBilling, apartmentBlockBilling);

  informBlock.append(countryBlock, birthBlock, cityBlock, postcodeBlock, adressBlock);
  parent.append(informBlock);
}
