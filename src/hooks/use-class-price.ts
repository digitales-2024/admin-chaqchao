import {
  useCreateClassPriceMutation,
  useGetClassPricesAllQuery,
  useUpdateClassPriceMutation,
} from "@/redux/services/classPriceApi";
import { ClassPriceConfigData, CustomErrorData } from "@/types";
import { translateError } from "@/utils/translateError";
import { toast } from "sonner";
export const useClassPrices = () => {
  const {
    data: dataClassPricesAll,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useGetClassPricesAllQuery();

  return { dataClassPricesAll, error, isLoading, isSuccess, refetch };
};

export const useCreateClassPrice = () => {
  const [createClassPrice] = useCreateClassPriceMutation();

  const onCreateClassPrice = async (input: Partial<ClassPriceConfigData>) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await createClassPrice(input);
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
      loading: "Creando precio de clase...",
      success: "Precio de clase creado con éxito",
      error: (err) => err.message,
    });
  };

  return { onCreateClassPrice };
};

export const useUpdateClassPrice = () => {
  const [updateClassPrice] = useUpdateClassPriceMutation();

  const onUpdateClassPrice = async (
    input: Partial<ClassPriceConfigData> & { id: string },
  ) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateClassPrice(input);
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
      loading: "Actualizando precio de clase...",
      success: "Precio de clase actualizado con éxito",
      error: (err) => err.message,
    });
  };

  return { onUpdateClassPrice };
};
