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
  | "DRINK"
  | "SPICES"
  | "PERSONAL_CARE"
  | "MERCH"
  | "OTHER";

// hacer una funcion o tipado para que pueda poner un label de family tipo "CHOCOLAT" y que me devuelva "Chocolates"

export const familyLabels: Record<Family, string> = {
  CHOCOLAT: "Chocolates",
  DRINK: "Bebidas",
  SPICES: "Especias",
  PERSONAL_CARE: "Cuidado Personal",
  MERCH: "Indumentaria y Accesorios",
  OTHER: "Otro",
};

export const Families: Family[] = [
  "CHOCOLAT",
  "DRINK",
  "SPICES",
  "PERSONAL_CARE",
  "MERCH",
  "OTHER",
];

export const familyOptions = Families.map((family) => ({
  label: familyLabels[family],
  value: family,
}));
