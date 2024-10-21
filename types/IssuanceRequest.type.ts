export interface Customer {
  _id: string;
  name: string;
  phone: string;
}

export interface Floater {
  _id: string;
  name: string;
  img: string;
}

export interface IssuanceRequestType {
  _id: string;
  couponID: string; // Assuming the couponID is just a string in this case
  customerID: Customer;
  issuerID: string;
  floaterID: Floater;
  isAccepted: boolean;
  hasAskedRedemption: boolean;
  isRedeemed: boolean;
  createdAt: string; // or Date if you handle it as Date object
  updatedAt: string; // or Date if you handle it as Date object
}
