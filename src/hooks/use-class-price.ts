import {
  useCreateClassPriceMutation,
  useGetClassPricesAllQuery,
  useUpdateClassPriceMutation,
  useDeleteClassPriceMutation,
  useGetClassPricesByTypeClassQuery,
} from "@/redux/services/classPriceApi";
import { ClassPriceConfigData, CustomErrorData, TypeClass } from "@/types";
import { translateError } from "@/utils/translateError";
import { toast } from "sonner";

export const useClassPrices = (typeClass?: TypeClass) => {
  const {
    data: dataClassPricesAll,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useGetClassPricesAllQuery();

  const {
    data: pricesDolar,
    isLoading: isLoadingPricesDolar,
    error: errorPricesDolar,
  } = useGetClassPricesByTypeClassQuery(
    {
      typeClass: typeClass || TypeClass.NORMAL,
    },
    {
      skip: !typeClass,
    },
  );

  const [createClassPrice] = useCreateClassPriceMutation();

  const [updateClassPrice] = useUpdateClassPriceMutation();

  const [deleteClassPrice] = useDeleteClassPriceMutation();

  const onCreateClassPrice = async (input: Partial<ClassPriceConfigData>) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await createClassPrice(input);
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

    return toast.promise(promise(), {
      loading: "Creando precio de clase...",
      success: "Precio de clase creado con éxito",
      error: (err) => err.message,
    });
  };

  const onUpdateClassPrice = async (
    input: Partial<ClassPriceConfigData> & { id: string },
  ) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateClassPrice(input);
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

    return toast.promise(promise(), {
      loading: "Actualizando precio de clase...",
      success: "Precio de clase actualizado con éxito",
      error: (err) => err.message,
    });
  };

  const onDeleteClassPrice = async (id: string) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await deleteClassPrice({ id });
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

    return toast.promise(promise(), {
      loading: "Eliminando precio de clase...",
      success: "Precio de clase eliminado con éxito",
      error: (err) => err.message,
    });
  };

  return {
    dataClassPricesAll,
    error,
    isLoading,
    isSuccess,
    refetch,
    onCreateClassPrice,
    onUpdateClassPrice,
    onDeleteClassPrice,
    pricesDolar,
    isLoadingPricesDolar,
    errorPricesDolar,
  };
};
