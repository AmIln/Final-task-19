import { Value } from "./Value";

export interface Prices {
  id: string;
  key: string;
  value: Value;
  discounted?: {
    value: Value;
    discount: {
      typeId: string;
      id: string;
    };
  };
}
