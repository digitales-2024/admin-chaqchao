export type Order = {
  id: string;
  orderStatus: string;
  pickupAddress: string;
  pickupTime: Date;
  isActive: boolean;
  someonePickup: boolean;
  pickupCode: string;
  totalAmount: null;
  client: Client;
};

export type OrderDetails = {
  id: string;
  orderStatus: string;
  pickupAddress: string;
  pickupTime: Date;
  isActive: boolean;
  someonePickup: boolean;
  pickupCode: string;
  totalAmount: null;
  client: Client;
  cart: Cart;
};

export type Cart = {
  id: string;
  clientId: string;
  cartItems: CartItem[];
};

type CartItem = {
  id: string;
  name: string;
  image: string;
  productId: string;
  quantity: number;
  price: number;
};

export type BillingDocument = {
  id: string;
  orderId: string;
  billingDocumentType: BillingDocumentType;
  documentNumber: string;
  issuedAt: string;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  isActive: boolean;
};

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  READY = "READY",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  ALL = "ALL",
}

// enum CartStatus {
//   ACTIVE = "ACTIVE",
//   PENDING = "PENDING",
//   COMPLETED = "COMPLETED",
// }

enum BillingDocumentType {
  INVOICE,
  RECEIPT,
}

enum PaymentStatus {
  PAID,
  PENDING,
  FAILED,
}
