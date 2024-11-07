import { Family } from "./category";

export type ProductData = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  isAvailable: boolean;
  isActive: boolean;
  category: CategoryData;
  createdAt: string;
  updatedAt: string;
  isRestricted: boolean;
  variations: ProductVariationData[];
};

export type ProductVariationData = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type CategoryData = {
  id: string;
  name: string;
  description: string;
  family: Family;
};

export interface ProductFilters {
  startDate?: string;
  endDate?: string;
  priceMin?: number;
  priceMax?: number;
  categoryName?: string;
}

export interface TopProductFilters {
  startDate: string;
  endDate: string;
  limit: string;
}

export type TopProduct = {
  id: string;
  name: string;
  isActive: boolean;
  price: number;
  image: string;
  category: CategoryData;
  totalOrdered: number;
};
