export interface Vendor {
  _id: string;
  name: string;
  img?: string;
  phone: string;
  address: string;
  category: string;
  isFloater: boolean;
  coupons: string[]; // Assuming you're just using IDs for the coupons
  isDistributingCoupon: boolean;
  issuanceLimit?: number;
  isActive: boolean;
  token: string;
}
