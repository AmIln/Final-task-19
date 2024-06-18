import { Result } from "../../interfaces/Results";
import { createCard } from "./createCard";

export async function createContent(parent: HTMLElement, element: Result): Promise<void> {
  const cardProduct = await createCard(element);
  parent.append(cardProduct);
}
