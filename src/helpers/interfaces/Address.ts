export interface Address {
  apartment: string;
  building: string;
  city: string;
  country: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  postalCode: string;
  streetName: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
}
