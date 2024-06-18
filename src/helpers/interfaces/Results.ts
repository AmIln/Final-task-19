import { MasterData } from "./MasterData";

export interface Result {
  createdAt: string;
  createdBy: {
    isPlatformClient: boolean;
    user: {
      id: string;
      typeId: string;
    };
  };
  id: string;
  key: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
    user: {
      id: string;
      typeId: string;
    };
  };
  lastVariantId: number;
  masterData: MasterData;
  priceMode: string;
  productType: {
    id: string;
    typeId: string;
  };
  version: number;
  versionModifiedAt: string;
}
