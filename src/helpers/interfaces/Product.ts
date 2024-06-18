import { Current } from "./Current";
import { Image } from "./Image";
import { Prices } from "./Prices";
import { Lang } from "./Lang";
import { Attribute } from "./Attribute";

export interface Product {
  assets: [];
  attributes: [Attribute];
  id: number;
  images: [Image];
  key: string;
  prices: [Prices];
  sku: string;
  metaDescription: Lang;
  metaTitle: Lang;
  name: Lang;
  searchKeywords: object;
  slug: Lang;
  variants: [Product];
  hasStagedChanges: boolean;
  published: boolean;
  staged: Current;
}
