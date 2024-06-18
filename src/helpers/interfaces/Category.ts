import { TypeId } from "./TypeId";
import { Lang } from "./Lang";
import { CreatedBy } from "@commercetools/platform-sdk";

export interface Category {
  ancestors: [];
  assets: [];
  createdAt: string;
  createdBy: {
    isPlatformClient: boolean;
    user: TypeId;
  };
  description: Lang;
  externalId: string;
  id: string;
  key: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: CreatedBy;
  metaDescription: Lang;
  metaTitle: Lang;
  name: Lang;
  orderHint: string;
  slug: Lang;
  version: number;
  versionModifiedAt: string;
}
