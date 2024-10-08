import {
  useCreateClassRegistrationMutation,
  useDeleteClassRegistrationMutation,
  useGetClassRegistrationsAllQuery,
  useUpdateClassRegistrationMutation,
} from "@/redux/services/classRegistrationApi";
import { ClassRegistrationData, CustomErrorData } from "@/types";
import { translateError } from "@/utils/translateError";
import { toast } from "sonner";
export const useClassRegistrations = () => {
  const {
    data: dataClassRegistrationsAll,
    error: errorClassRegistrations,
    isLoading,
    isSuccess,
    refetch,
  } = useGetClassRegistrationsAllQuery();

  const [createClassRegistration] = useCreateClassRegistrationMutation();

  const [updateClassRegistration] = useUpdateClassRegistrationMutation();

  const [deleteClassRegistration] = useDeleteClassRegistrationMutation();

  const onCreateClassRegistration = async (
    input: Partial<ClassRegistrationData>,
  ) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await createClassRegistration(input);
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
      loading: "Creando registro de clase...",
      success: "Registro de clase creado con éxito",
      error: (err) => err.message,
    });
  };

  const onUpdateClassRegistration = async (
    input: Partial<ClassRegistrationData> & { id: string },
  ) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateClassRegistration(input);
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
      loading: "Actualizando registro de clase...",
      success: "Registro de clase actualizado con éxito",
      error: (err) => err.message,
    });
  };

  const onDeleteClassRegistration = async (id: string) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await deleteClassRegistration({ id });
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
      loading: "Eliminando configuracion de registro de la clase...",
      success: "Configuracion de registro de la clase eliminado con éxito",
      error: (err) => err.message,
    });
  };

  return {
    dataClassRegistrationsAll,
    errorClassRegistrations,
    isLoading,
    isSuccess,
    refetch,
    onCreateClassRegistration,
    onUpdateClassRegistration,
    onDeleteClassRegistration,
  };
};
