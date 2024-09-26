import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/services/categoriesApi";
import { CustomErrorData, Category } from "@/types";
import { translateError } from "@/utils/translateError";
import { toast } from "sonner";

export const useCategories = () => {
  // Query para obtener categorías
  const { data, error, isLoading } = useGetCategoriesQuery();

  // Mutación para crear categoría
  const [createCategory, { isSuccess: isSuccessCreateCategory }] =
    useCreateCategoryMutation();

  // Función para crear una nueva categoría
  const onCreateCategory = async (input: Partial<Category>) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await createCategory(input);
          if (result.error && "data" in result.error) {
            const error = (result.error.data as CustomErrorData).message;
            const message = translateError(error as string);
            reject(new Error(message));
          }
          if (result.error) {
            reject(
              new Error(
                "Ocurrió un error inesperado, por favor intenta de nuevo",
              ),
            );
          }
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

    // Uso de toast para feedback
    toast.promise(promise(), {
      loading: "Creando categoría...",
      success: "Categoría creada exitosamente",
      error: (error) => {
        return error.message;
      },
    });
  };

  return {
    data, // Las categorías obtenidas
    error, // Posibles errores en la query
    isLoading, // Estado de carga
    onCreateCategory, // Función para crear una categoría
    isSuccessCreateCategory, // Estado de éxito en la creación
  };
};
