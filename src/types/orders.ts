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
  orderStatus: string;
  pickupAddress: string;
  pickupTime: string;
  comments: string;
  isActive: boolean;
  cartId: string;
  someonePickup: boolean;
  cart: CartItem[];
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  pickupCode: string;
  totalAmount: number;
};

export type OrderDetails = {
  id: string;
  orderStatus: OrderStatus;
  pickupAddress: string;
  pickupTime: string;
  comments: string;
  isActive: boolean;
  cartId: string;
  someonePickup: boolean;
  cart: CartItem[];
  pickupCode: string;
  totalAmount: number;
  client: Client;
  updatedAt: string;
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

export interface OrderFilters {
  startDate?: string;
  endDate?: string;
  orderStatus?: string;
  totalAmountMin?: number;
  totalAmountMax?: number;
  isActive?: boolean;
}

export type OrderReportData = {
  id: string;
  cartId: string;
  pickupCode: string;
  totalAmount: number;
  pickupTime: string;
  orderStatus: string;
  pickupAddress: string;
  someonePickup: boolean;
  comments: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  cart: Cart;
};
