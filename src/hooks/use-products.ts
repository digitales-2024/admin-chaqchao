import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetAllProductsQuery,
  useDeleteProductsMutation,
  useToggleProductActivationMutation,
  useReactivateProductsMutation,
} from "@/redux/services/productsApi";
import { CreateProductsSchema } from "@/schemas/products/createProductsSchema";
import { ProductData, CustomErrorData } from "@/types";
import { translateError } from "@/utils/translateError";
import { toast } from "sonner";

export const useProducts = () => {
  const {
    data: dataProductsAll,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useGetAllProductsQuery();

  return { dataProductsAll, error, isLoading, isSuccess, refetch };
};

export const useCreateProduct = () => {
  const [createProduct, { isSuccess: isSuccessCreateProduct }] =
    useCreateProductMutation();

  const onCreateProduct = async (input: Partial<ProductData>) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await createProduct(input);
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

    return toast.promise(promise(), {
      loading: "Creando producto...",
      success: "Producto creado con éxito",
      error: (err) => err.message,
    });
  };

  return { onCreateProduct, isSuccessCreateProduct };
};

export const useUpdateProduct = () => {
  const [
    updateProduct,
    { isSuccess: isSuccessUpdateProduct, isLoading: isLoadingUpdateProduct },
  ] = useUpdateProductMutation();

  const onUpdateProduct = async (
    input: CreateProductsSchema & { id: string },
  ) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateProduct(input);
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

    toast.promise(promise(), {
      loading: "Actualizando...",
      success: "Producto actualizado",
      error: (error) => {
        return error.message;
      },
    });
  };

  return { onUpdateProduct, isSuccessUpdateProduct, isLoadingUpdateProduct };
};

export const useDeleteProducts = () => {
  const [deleteProducts, { isSuccess: isSuccessDeleteProducts }] =
    useDeleteProductsMutation();

  const onDeleteProducts = async (ids: ProductData[]) => {
    const onlyIds = ids.map((product) => product.id);
    const idsString = {
      ids: onlyIds,
    };
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await deleteProducts(idsString);
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

    toast.promise(promise(), {
      loading: "Eliminando...",
      success: "Productos eliminados",
      error: (error) => {
        return error.message;
      },
    });
  };

  return { onDeleteProducts, isSuccessDeleteProducts };
};

export const useToggleProductActivation = () => {
  const [toggleProductActivation] = useToggleProductActivationMutation();

  const onToggleProductActivation = async (id: string) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await toggleProductActivation({ id });
          if (result.error && "data" in result.error) {
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

    return toast.promise(promise(), {
      loading: "Cambiando estado del producto...",
      success: "Estado del producto cambiado con éxito",
      error: (err) => err.message,
    });
  };

  return { onToggleProductActivation };
};

export const useRectivateProducts = () => {
  const [
    reactivateProducts,
    {
      isSuccess: isSuccessReactivateProducts,
      isLoading: isLoadingReactivateProducts,
    },
  ] = useReactivateProductsMutation();

  const onReactivateProducts = async (ids: ProductData[]) => {
    const onlyIds = ids.map((user) => user.id);
    const idsString = {
      ids: onlyIds,
    };
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await reactivateProducts(idsString);
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

    toast.promise(promise(), {
      loading: "Reactivando...",
      success: "Productos reactivados",
      error: (error) => {
        return error.message;
      },
    });
  };

  return {
    onReactivateProducts,
    isSuccessReactivateProducts,
    isLoadingReactivateProducts,
  };
};
