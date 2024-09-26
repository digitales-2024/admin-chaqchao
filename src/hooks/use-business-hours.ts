import {
  useCreateBusinessHourMutation,
  useGetBusinessHoursAllQuery,
  useUpdateBusinessHourMutation,
} from "@/redux/services/businessHoursApi";
import { BusinessHoursData, CustomErrorData } from "@/types";
import { translateError } from "@/utils/translateError";
import { toast } from "sonner";

export const useBusinessHours = () => {
  const {
    data: dataBusinessHoursAll,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useGetBusinessHoursAllQuery();

  return { dataBusinessHoursAll, error, isLoading, isSuccess, refetch };
};

export const useCreateBusinessHour = () => {
  const [createBusinessHour] = useCreateBusinessHourMutation();

  const onCreateBusinessHour = async (input: Partial<BusinessHoursData>) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await createBusinessHour(input);
          if (
            result.error &&
            typeof result.error === "object" &&
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

    return toast.promise(promise(), {
      loading: "Creando hora de negocio...",
      success: "Hora de negocio creada con éxito",
      error: (err) => err.message,
    });
  };

  return { onCreateBusinessHour };
};

export const useUpdateBusinessHour = () => {
  const [updateBusinessHour] = useUpdateBusinessHourMutation();

  const onUpdateBusinessHour = async (
    input: Partial<BusinessHoursData> & { id: string },
  ) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateBusinessHour(input);
          if (
            result.error &&
            typeof result.error === "object" &&
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

    return toast.promise(promise(), {
      loading: "Actualizando hora de negocio...",
      success: "Hora de negocio actualizada con éxito",
      error: (err) => err.message,
    });
  };

  return { onUpdateBusinessHour };
};
