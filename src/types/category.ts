export type Category = {
  id: string; // ID de la categoría
  name: string; // Nombre de la categoría
  description?: string; // Descripción opcional de la categoría
  family: Family; // Familia a la que pertenece la categoría
  isActive: boolean; //Indica si esta activa o no la categoria
  createdAt: string; // Fecha de creación
  updatedAt: string; // Fecha de última actualización
};

export type Family =
  | "CHOCOLAT"
  | "COCOA_DERIVATIVE" // Derivados del cacao
  | "SPECIAL" // Especiales
  | "BODY_PRODUCTS"
  | "MERCHANDISING"
  | "OTHER";

// hacer una funcion o tipado para que pueda poner un label de family tipo "CHOCOLAT" y que me devuelva "Chocolates"

export const familyLabels: Record<Family, string> = {
  CHOCOLAT: "Chocolates",
  COCOA_DERIVATIVE: "Derivados del Cacao y otros",
  SPECIAL: "Especiales varios y agregados",
  BODY_PRODUCTS: "Body Products",
  MERCHANDISING: "Merchandising",
  OTHER: "Otro",
};

export const Families: Family[] = [
  "CHOCOLAT",
  "COCOA_DERIVATIVE",
  "SPECIAL",
  "BODY_PRODUCTS",
  "MERCHANDISING",
  "OTHER",
];

export const familyOptions = Families.map((family) => ({
  label: familyLabels[family],
  value: family,
}));
