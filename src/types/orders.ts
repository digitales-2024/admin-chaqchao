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
  customerName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;
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
  billingDocument: BillingDocument;
};

type BillingDocument = {
  billingDocumentType: BillingDocumentType;
  documentNumber: string;
  address: string;
  state: string;
  country: string;
  city: string;
  postalCode: string;
  typeDocument: string;
  businessName: string;
  paymentStatus: PaymentStatus;
};

export type Cart = { quantity: number; products: ProductData[] };

type ProductData = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: CategoryData;
};
type CategoryData = {
  id: string;
  name: string;
};

type Client = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
};

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  ALL = "ALL",
}

// enum CartStatus {
//   ACTIVE = "ACTIVE",
//   PENDING = "PENDING",
//   COMPLETED = "COMPLETED",
// }

export enum BillingDocumentType {
  INVOICE,
  RECEIPT,
}

export interface BillingDocumentData {
  [key: string]: BillingDocumentType;
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
  priceMin?: number;
  priceMax?: number;
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
