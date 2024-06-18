import { LineItem } from "./LineItem";
import { TypeId } from "./TypeId";

export interface ShoppingList {
  createdAt: string;
  createdBy: {
    clientId: string;
    isPlatformClient: false;
  };
  customer: [TypeId];
  deleteDaysAfterLastModification: number;
  id: string;
  key: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: false;
  };
  lineItems: [LineItem];
  name: {
    en: string;
  };
  slug: {
    en: string;
  };
  textLineItems: [];
  version: number;
  versionModifiedAt: string;
}
