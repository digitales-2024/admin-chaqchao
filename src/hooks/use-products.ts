import {
  useCreateProductMutation,
  useDeleteProductsMutation,
  useGetAllProductsQuery,
  useReactivateProductsMutation,
  useToggleProductActivationMutation,
  useUpdateProductMutation,
} from "@/redux/services/productsApi";
import { CustomErrorData, ProductData } from "@/types";
import { translateError } from "@/utils/translateError";
import { useRef } from "react";
import { toast } from "sonner";

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export const useProducts = () => {
  const {
    data: dataProductsAll,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useGetAllProductsQuery();
  const [
    createProduct,
    { isSuccess: isSuccessCreateProduct, isLoading: isLoadingCreateProduct },
  ] = useCreateProductMutation();

  const [
    updateProduct,
    { isSuccess: isSuccessUpdateProduct, isLoading: isLoadingUpdateProduct },
  ] = useUpdateProductMutation();

  const [deleteProducts, { isSuccess: isSuccessDeleteProducts }] =
    useDeleteProductsMutation();

  const [
    toggleProductActivation,
    {
      isSuccess: isSuccessToggleProductActivation,
      isLoading: isLoadingToggleProductActivation,
    },
  ] = useToggleProductActivationMutation();

  const [
    reactivateProducts,
    {
      isSuccess: isSuccessReactivateProducts,
      isLoading: isLoadingReactivateProducts,
    },
  ] = useReactivateProductsMutation();

  const onCreateProduct = async (
    input: {
      name: string;
      categoryId: string;
      description?: string;
      price: number;
      maxStock: number;
      isRestricted?: boolean;
    },
    files?: File[],
  ) => {
    const promise = () =>
      new Promise<string>(async (resolve, reject) => {
        try {
          const formData = new FormData();
          // Agregar los datos del producto
          Object.entries(input).forEach(([key, value]) => {
            formData.append(key, value?.toString() ?? "");
          });

          // Agregar las imágenes si existen
          if (files && files.length > 0) {
            Array.from(files).forEach((file) => {
              formData.append("images", file, file.name);
            });
          }

          const result = await createProduct(formData);
          if (result.error) {
            if (typeof result.error === "object" && "data" in result.error) {
              const error = (result.error.data as CustomErrorData).message;
              const message = translateError(error as string);
              reject(new Error(message));
            } else {
              reject(
                new Error(
                  "Ocurrió un error inesperado, por favor intenta de nuevo",
                ),
              );
            }
          } else if ("data" in result && result.data) {
            const response = result.data as ApiResponse<ProductData>;
            resolve(response.data.id);
          } else {
            reject(new Error("No se pudo obtener el ID del producto creado"));
          }
        } catch (error) {
          reject(error);
        }
      });

    return toast.promise(promise(), {
      loading: "Creando producto...",
      success: "Producto creado",
      error: (error) => {
        return error.message;
      },
    });
  };

  const onUpdateProduct = async (
    input: Partial<ProductData> & { id: string },
    files?: File[],
    imagesToDelete?: string[],
  ) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const formData = new FormData();
          // Agregar los datos del producto
          Object.entries(input).forEach(([key, value]) => {
            if (key !== "id") {
              formData.append(key, value?.toString() ?? "");
            }
          });

          // Agregar los archivos de imágenes con el mismo nombre de campo
          if (files && files.length > 0) {
            Array.from(files).forEach((file) => {
              formData.append("images", file, file.name);
            });
          }

          // Agregar el array de IDs de las imágenes a eliminar
          if (imagesToDelete && imagesToDelete.length > 0) {
            Array.from(imagesToDelete).forEach((id) => {
              formData.append("deleteImages[]", id);
            });
          }

          const result = await updateProduct({ id: input.id, formData });
          if (
            result.error &&
            typeof result.error === "object" &&
            result.error !== null &&
            "data" in result.error
          ) {
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

    toast.promise(promise(), {
      loading: "Actualizando...",
      success: "Producto actualizado",
      error: (error) => {
        return error.message;
      },
    });
  };

  const onDeleteProduct = async (productId: string) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await deleteProducts({ ids: [productId] });
          if (result.error) {
            if (typeof result.error === "object" && "data" in result.error) {
              const error = (result.error.data as CustomErrorData).message;
              const message = translateError(error as string);
              reject(new Error(message));
            } else {
              reject(
                new Error(
                  "Ocurrió un error inesperado, por favor intenta de nuevo",
                ),
              );
            }
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      });

    return toast.promise(promise(), {
      loading: "Eliminando producto...",
      success: "Producto eliminado",
      error: (err) => err.message,
    });
  };

  const onDeleteProducts = async (ids: ProductData[]) => {
    const onlyIds = ids.map((product) => product.id);
    const idsString = {
      ids: onlyIds,
    };
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await deleteProducts(idsString);
          if (
            result.error &&
            typeof result.error === "object" &&
            result.error !== null &&
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
      loading: "Eliminando...",
      success: "Productos eliminados",
      error: (error) => {
        return error.message;
      },
    });
  };

  const onToggleProductActivation = async (id: string) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await toggleProductActivation({ id });
          if (result.error) {
            if (
              typeof result.error === "object" &&
              result.error !== null &&
              "data" in result.error
            ) {
              const error = (result.error.data as CustomErrorData).message;
              const message = translateError(error as string);
              reject(new Error(message));
            } else {
              reject(
                new Error(
                  "Ocurrió un error inesperado, por favor intenta de nuevo",
                ),
              );
            }
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      });

    return toast.promise(promise(), {
      loading: "Cambiando estado del producto...",
      success: "Estado del producto cambiado con éxito",
      error: (err) => err.message,
    });
  };

  const onReactivateProducts = async (ids: ProductData[]) => {
    const onlyIds = ids.map((user) => user.id);
    const idsString = {
      ids: onlyIds,
    };
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await reactivateProducts(idsString);
          if (result.error) {
            if (typeof result.error === "object" && "data" in result.error) {
              const error = (result.error.data as CustomErrorData).message;
              const message = translateError(error as string);
              reject(new Error(message));
            } else {
              reject(
                new Error(
                  "Ocurrió un error inesperado, por favor intenta de nuevo",
                ),
              );
            }
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      });

    toast.promise(promise(), {
      loading: "Reactivando...",
      success: "Productos reactivados",
      error: (error) => {
        return error.message;
      },
    });
  };

  const abortControllerRef = useRef<AbortController | null>(null);

  const cancelUploadImage = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      toast.error("Creación de producto cancelada");
    }
  };

  return {
    dataProductsAll,
    error,
    isLoading,
    isSuccess,
    refetch,
    onCreateProduct,
    isSuccessCreateProduct,
    isLoadingCreateProduct,
    cancelUploadImage,
    onUpdateProduct,
    isSuccessUpdateProduct,
    isLoadingUpdateProduct,
    onDeleteProducts,
    onDeleteProduct,
    isSuccessDeleteProducts,
    onToggleProductActivation,
    isSuccessToggleProductActivation,
    isLoadingToggleProductActivation,
    onReactivateProducts,
    isSuccessReactivateProducts,
    isLoadingReactivateProducts,
  };
};
