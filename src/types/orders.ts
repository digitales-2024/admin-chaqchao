export type OrderData = {
  id: string;
  code: number;
  orderStatus: string;
  pickupAddress: string;
  pickupTime: string;
  comments: string;
  isActive: boolean;
  name: string;
  email: string;
  phone: string;
};
export type Order = {
  id: string;
  cartId: string;
  orderStatus: OrderStatus;
  pickupAddress: string;
  pickupTime: string;
  comments: string;
  isActive: boolean;
};

export type Cart = {
  id: string;
  clientId: string;
  cartItems: CartItem[];
};

type CartItem = {
  id: string;
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

export enum OrderStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
}
enum BillingDocumentType {
  INVOICE,
  RECEIPT,
}

enum PaymentStatus {
  PAID,
  PENDING,
  FAILED,
}
