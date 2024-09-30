import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoriesQuery,
  useDeactivateCategoryMutation,
  useReactivateCategoryMutation,
} from "@/redux/services/categoriesApi";
import { CreateCategoriesSchema, UpdateCategoriesSchema } from "@/schemas";
import { CustomErrorData } from "@/types";
import { translateError } from "@/utils/translateError";
import { toast } from "sonner";

export const useCategories = () => {
  const { data, error, isLoading } = useGetCategoriesQuery();

  const [createCategory, { isSuccess: isSuccessCreateCategory }] =
    useCreateCategoryMutation();

  const [
    updateCategory,
    { isSuccess: isSuccessUpdateCategory, isLoading: isLoadingUpdateCategory },
  ] = useUpdateCategoryMutation();

  const [deactivateCategory, { isSuccess: isSuccessDeactivateCategory }] =
    useDeactivateCategoryMutation();

  const [
    reactivateCategory,
    {
      isSuccess: isSuccessReactivateCategory,
      isLoading: isLoadingReactivateCategory,
    },
  ] = useReactivateCategoryMutation();

  const onCreateCategory = async (input: CreateCategoriesSchema) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await createCategory(input);
          if (
            result.error &&
            typeof result.error === "object" &&
            "data" in result.error
          ) {
            const error = (result.error.data as CustomErrorData).message;
            const message = translateError(error as string);
            reject(new Error(message));
          } else if (result.error) {
            reject(
              new Error(
                "Ocurrió un error inesperado, por favor intenta de nuevo",
              ),
            );
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      });

    toast.promise(promise(), {
      loading: "Creando categoría...",
      success: "Categoría creada exitosamente",
      error: (error) => error.message,
    });
  };

  const onUpdateCategory = async (input: UpdateCategoriesSchema) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateCategory(input);
          if (result.error) {
            if (
              result.error &&
              typeof result.error === "object" &&
              "data" in result.error
            ) {
              const error = (result.error.data as CustomErrorData).message;
              const message = translateError(error as string);
              return reject(new Error(message));
            }
            return reject(
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

    toast.promise(promise(), {
      loading: "Actualizando categoría...",
      success: "Categoría actualizada exitosamente",
      error: (error) => error.message,
    });
  };

  const onDeactivateCategory = async (id: string) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await deactivateCategory(id);
          if (result.error) {
            if (
              result.error &&
              typeof result.error === "object" &&
              "data" in result.error
            ) {
              const error = (result.error.data as CustomErrorData).message;
              const message = translateError(error as string);
              return reject(new Error(message));
            }
            return reject(
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

    toast.promise(promise(), {
      loading: "Eliminando categoría...",
      success: "Categoría eliminada exitosamente",
      error: (error) => error.message,
    });
  };

  const onReactivateCategory = async (id: string) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await reactivateCategory(id);
          if (result.error) {
            if (
              result.error &&
              typeof result.error === "object" &&
              "data" in result.error
            ) {
              const error = (result.error.data as CustomErrorData).message;
              const message = translateError(error as string);
              return reject(new Error(message));
            }
            return reject(
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

    toast.promise(promise(), {
      loading: "Reactivando categoría...",
      success: "Categoría reactivada exitosamente",
      error: (error) => error.message,
    });
  };

  return {
    data,
    error,
    isLoading,
    onCreateCategory,
    isSuccessCreateCategory,
    onUpdateCategory,
    isSuccessUpdateCategory,
    isLoadingUpdateCategory,
    onDeactivateCategory,
    isSuccessDeactivateCategory,
    onReactivateCategory,
    isSuccessReactivateCategory,
    isLoadingReactivateCategory,
  };
};
