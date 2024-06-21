import { Lang } from "./Lang";
import { TypeId } from "./TypeId";

export interface Promotion {
  cartPredicate: string;
  createdAt: string;
  createdBy: {
    isPlatformClient: boolean;
    user: TypeId;
  };
  description: Lang;
  id: string;
  isActive: boolean;
  key: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
    user: TypeId;
  };
  name: Lang;
  references: [];
  requiresDiscountCode: boolean;
  sortOrder: string;
  stackingMode: string;
  stores: [
    {
      key: string;
      typeId: string;
    },
  ];
  target: {
    predicate?: string;
    type: string;
  };
  validFrom: string;
  validUntil: string;
  value: {
    money?: [
      {
        centAmount: number;
        currencyCode: string;
        fractionDigits: number;
        type: string;
      },
    ];
    type: string;
    permyriad?: number;
  };
  version: number;
  versionModifiedAt: string;
}
