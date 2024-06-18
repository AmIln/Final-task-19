import { Lang } from "./Lang";
import { Product } from "./Product";
import { TypeId } from "./TypeId";

export interface Current {
  categories: [TypeId];
  categoryOrderHints: object;
  description: Lang;
  masterVariant: Product;
  metaDescription: Lang;
  metaTitle: Lang;
  name: Lang;
  searchKeywords: object;
  slug: Lang;
  variants: [Product];
}
