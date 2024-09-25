export type ProductData = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  isAvailable: boolean;
  isActive: boolean;
  category: CategoryData;
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
