import {
  useCreateProductMutation,
  useDeleteProductsMutation,
  useGetAllProductsQuery,
  useReactivateProductsMutation,
  useToggleProductActivationMutation,
  useUpdateProductImageMutation,
  useUpdateProductMutation,
  useUploadMultipleProductImagesMutation,
  useUploadProductImageMutation,
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
  const [
    uploadImageProduct,
    {
      isSuccess: isSuccessUploadImageProduct,
      isLoading: isLoadingUploadImageProduct,
      status: uploadImageProductStatus,
    },
  ] = useUploadProductImageMutation();

  const [
    uploadMultipleProductImages,
    {
      isSuccess: isSuccessUploadMultipleImages,
      isLoading: isLoadingUploadMultipleImages,
    },
  ] = useUploadMultipleProductImagesMutation();

  const [
    updateImageProduct,
    {
      isSuccess: isSuccessUpdateImageProduct,
      isLoading: isLoadingUpdateImageProduct,
    },
  ] = useUpdateProductImageMutation();

  const onCreateProduct = async (
    input: Partial<Omit<ProductData, "images">>,
  ) => {
    const promise = () =>
      new Promise<string>(async (resolve, reject) => {
        try {
          const result = await createProduct(input);
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

    return await promise();
  };

  const onUpdateProduct = async (
    input: Partial<ProductData> & { id: string },
  ) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateProduct(input);
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

  const onUploadImageProduct = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    abortControllerRef.current = new AbortController();

    try {
      const result = await uploadImageProduct({
        formData,
        signal: abortControllerRef.current.signal,
      }).unwrap();
      return result;
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        return null;
      }
      throw error;
    } finally {
      abortControllerRef.current = null;
    }
  };

  const onUpdateImageProduct = async (file: File, existingFileName: string) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const result = await updateImageProduct({
        formData,
        existingFileName,
      }).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };
  const cancelUploadImage = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      toast.error("Creación de producto cancelada");
    }
  };

  const onUploadMultipleProductImages = async (
    productId: string,
    files: File[],
  ) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const result = await uploadMultipleProductImages({
        productId,
        formData,
      }).unwrap();
      return result;
    } catch (error) {
      // Si falla la subida de imágenes, eliminamos el producto
      await onDeleteProduct(productId).catch(() => {
        // Ignoramos error de eliminación ya que el error principal es la subida
      });
      throw error;
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
    isSuccessDeleteProducts,
    onToggleProductActivation,
    isSuccessToggleProductActivation,
    isLoadingToggleProductActivation,
    onReactivateProducts,
    isSuccessReactivateProducts,
    isLoadingReactivateProducts,
    onUploadImageProduct,
    isSuccessUploadImageProduct,
    isLoadingUploadImageProduct,
    onUpdateImageProduct,
    isSuccessUpdateImageProduct,
    isLoadingUpdateImageProduct,
    uploadImageProductStatus,
    onUploadMultipleProductImages,
    isSuccessUploadMultipleImages,
    isLoadingUploadMultipleImages,
  };
};
