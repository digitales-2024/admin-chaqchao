export type Category = {
  id: string; // ID de la categoría
  name: string; // Nombre de la categoría
  description?: string; // Descripción opcional de la categoría
  isActive: boolean; //Indica si esta activa o no la categoria
  createdAt: string; // Fecha de creación
  updatedAt: string; // Fecha de última actualización
};
