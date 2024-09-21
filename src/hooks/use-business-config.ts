import {
  useCreateBusinessConfigMutation,
  useGetBusinessConfigAllQuery,
  useUpdateBusinessConfigMutation,
} from "@/redux/services/businessConfigApi";
import { useCreateBusinessHourMutation } from "@/redux/services/businessHoursApi";
import {
  BusinessConfigData,
  BusinessHoursDataWithId,
  CustomErrorData,
} from "@/types";
import { translateError } from "@/utils/translateError";
import { toast } from "sonner";

interface BusinessConfigCreate {
  data: BusinessConfigData;
  message: string;
  statusCode: number;
}

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
  const [createBusinessHour] = useCreateBusinessHourMutation();

  const onCreateBusinessConfig = async (input: Partial<BusinessConfigData>) => {
    const promise = async () => {
      try {
        const result = (await createBusinessConfig(
          input,
        ).unwrap()) as unknown as BusinessConfigCreate;

        if (!result.data) {
          throw new Error("No se pudo obtener el ID del negocio");
        }

        const businessId = result.data.id;

        if (!businessId) {
          throw new Error("El ID del negocio es undefined");
        }

        const daysOfWeek = [
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ];
        const businessHoursPromises = daysOfWeek.map((day) => {
          const businessHour: Partial<BusinessHoursDataWithId> = {
            dayOfWeek: day,
            openingTime: "00:00",
            closingTime: "00:01",
            businessId,
          };
          return createBusinessHour(businessHour).unwrap();
        });

        await Promise.all(businessHoursPromises);

        return result;
      } catch (error) {
        console.error("Error creating business config:", error);
        throw error;
      }
    };

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
    const promise = async () => {
      try {
        const result = await updateBusinessConfig(input);
        if (result.error && "data" in result.error) {
          const error = (result.error.data as CustomErrorData).message;
          const message = translateError(error as string);
          throw new Error(message);
        }
        if (result.error) {
          throw new Error(
            "Ocurrió un error inesperado, por favor intenta de nuevo",
          );
        }
        return result;
      } catch (error) {
        console.error("Error updating business config:", error);
        throw error;
      }
    };

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
