import {
  useCreateBusinessConfigMutation,
  useGetBusinessConfigAllQuery,
  useUpdateBusinessConfigMutation,
} from "@/redux/services/businessConfigApi";
import { BusinessConfigData, CustomErrorData } from "@/types";
import { translateError } from "@/utils/translateError";
import { toast } from "sonner";

export const useBussinessConfig = () => {
  const {
    data: dataBusinessConfigAll,
    error,
    isLoading,
    isSuccess,
  } = useGetBusinessConfigAllQuery();

  return { dataBusinessConfigAll, error, isLoading, isSuccess };
};

export const useCreateBusinessConfig = () => {
  const [createBusinessConfig] = useCreateBusinessConfigMutation();

  const onCreateBusinessConfig = async (input: Partial<BusinessConfigData>) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await createBusinessConfig(input);
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
      loading: "Creando...",
      success: "Configuración de negocio creada",
      error: (error) => {
        return error.message;
      },
    });
  };

  return { onCreateBusinessConfig };
};

export const useUpdateBusinessConfig = () => {
  const [updateBusinessConfig] = useUpdateBusinessConfigMutation();

  const onUpdateBusinessConfig = async (
    input: Partial<BusinessConfigData> & { id: string },
  ) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateBusinessConfig(input);
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
      success: "Configuración de negocio actualizada",
      error: (error) => {
        return error.message;
      },
    });
  };

  return { onUpdateBusinessConfig };
};
