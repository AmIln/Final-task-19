import { Lang } from "./Lang";
import { Product } from "./Product";
import { TypeId } from "./TypeId";

export interface SearchResult {
  categories: [TypeId];
  categoryOrderHints: object;
  createdAt: string;
  description: Lang;
  hasStagedChanges: boolean;
  id: string;
  key: string;
  lastModifiedAt: string;
  masterVariant: Product;
  metaDescription: Lang;
  metaTitle: Lang;
  name: Lang;
  priceMode: string;
  productType: TypeId;
  published: boolean;
  searchKeywords: object;
  slug: Lang;
  variants: [Product];
}
