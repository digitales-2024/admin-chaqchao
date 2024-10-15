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
};

export interface ProductFilters {
  startDate?: string;
  endDate?: string;
  name?: string;
  priceMin?: number;
  priceMax?: number;
  isActive?: boolean;
  isRestricted?: boolean;
  isAvailable?: boolean;
  categoryName?: string;
  refreshKey?: number;
}

export interface TopProductFilters {
  startDate: string;
  endDate: string;
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
