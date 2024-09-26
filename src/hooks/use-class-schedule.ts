import {
  useCreateClassScheduleMutation,
  useDeleteClassScheduleMutation,
  useGetClassSchedulesAllQuery,
  useUpdateClassScheduleMutation,
} from "@/redux/services/classScheduleApi";
import { ClassScheduleData, CustomErrorData } from "@/types";
import { translateError } from "@/utils/translateError";
import { toast } from "sonner";

export const useClassSchedules = () => {
  const {
    data: dataClassSchedulesAll,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useGetClassSchedulesAllQuery();

  return { dataClassSchedulesAll, error, isLoading, isSuccess, refetch };
};

export const useCreateClassSchedule = () => {
  const [createClassSchedule] = useCreateClassScheduleMutation();

  const onCreateClassSchedule = async (input: Partial<ClassScheduleData>) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await createClassSchedule(input);
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
      loading: "Creando horario de clase...",
      success: "Horario de clase creado con éxito",
      error: (err) => err.message,
    });
  };

  return { onCreateClassSchedule };
};

export const useUpdateClassSchedule = () => {
  const [updateClassSchedule] = useUpdateClassScheduleMutation();

  const onUpdateClassSchedule = async (
    input: Partial<ClassScheduleData> & { id: string },
  ) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateClassSchedule(input);
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
      loading: "Actualizando horario de clase...",
      success: "Horario de clase actualizado con éxito",
      error: (err) => err.message,
    });
  };

  return { onUpdateClassSchedule };
};

export const useDeleteClassSchedule = () => {
  const [deleteClassSchedule] = useDeleteClassScheduleMutation();

  const onDeleteClassSchedule = async (id: string) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await deleteClassSchedule({ id });
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
      loading: "Eliminando horario de clase...",
      success: "Horario de clase eliminado con éxito",
      error: (err) => err.message,
    });
  };

  return { onDeleteClassSchedule };
};
