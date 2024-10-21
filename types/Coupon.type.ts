export interface Floater {
  _id: string;
  name: string;
  img: string;
  phone: string;
  address: string;
}

export interface CouponType {
  _id: string;
  floaterID: Floater;
  category: string;
  offerTitle: string;
  validityCriteria: string;
  issuedTo: string[]; // Assuming `issuedTo` is an array of user IDs or strings
  isCouponActive: boolean;
  impressions: number;
  clicks: number;
  createdAt: string; // Can also use `Date` type depending on how you handle dates
  updatedAt: string; // Can also use `Date` type depending on how you handle dates
}
