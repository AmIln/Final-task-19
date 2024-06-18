import { Result } from "../interfaces/Results";
import { Attribute } from "../interfaces/Attribute";

export function checkFilters(product: Result): boolean {
  const milk = document.getElementById("filter-milk") as HTMLInputElement;
  const nuts = document.getElementById("filter-nuts") as HTMLInputElement;
  const dark = document.getElementById("filter-dark") as HTMLInputElement;
  const assorted = document.getElementById("filter-assorted") as HTMLInputElement;

  const showAttribytes = [
    {
      name: "milk",
      value: milk.checked,
    },
    {
      name: "nuts",
      value: nuts.checked,
    },
    {
      name: "dark",
      value: dark.checked,
    },
    {
      name: "assorted",
      value: assorted.checked,
    },
  ];

  const attributes = product.masterData.current.masterVariant.attributes as [Attribute];
  let passedFiltering = true;

  showAttribytes.forEach((showObj: Attribute) => {
    const necessary = attributes.find((prodObj) => prodObj.name === showObj.name);
    if (necessary) {
      if (showObj.value === false && necessary.value === true) {
        passedFiltering = false;
      }
    }
  });

  return passedFiltering;
}
