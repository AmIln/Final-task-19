export interface LineItem {
  addedAt: string;
  id: string;
  name: {
    en: string;
    ru: string;
  };
  productId: string;
  productType: {
    id: string;
    typeId: string;
  };
  quantity: number;
}
