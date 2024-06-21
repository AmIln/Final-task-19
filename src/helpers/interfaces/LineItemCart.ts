import { VariantValues } from "@commercetools/platform-sdk";
import { Lang } from "./Lang";
import { Prices } from "./Prices";
import { TypeId } from "./TypeId";
import { Value } from "./Value";

export interface LineItemCart {
  addedAt: string;
  id: string;
  lastModifiedAt: string;
  lineItemMode: string;
  name: Lang;
  perMethodTaxRate: [];
  price: {
    discounted: {
      discount: TypeId;
      value: Value;
    };
    id: string;
    value: Value;
  };
  priceMode: string;
  productId: string;
  productKey: string;
  productSlug: Lang;
  productType: {
    id: string;
    typeId: string;
    version: number;
  };
  quantity: number;
  state: [
    {
      quantity: number;
      state: TypeId;
    },
  ];
  taxedPricePortions: [];
  totalPrice: Prices; // под вопросом
  variant: VariantValues; // под вопросом
}
