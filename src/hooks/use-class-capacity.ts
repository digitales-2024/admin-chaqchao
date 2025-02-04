import {
  useCreateClassCapacityMutation,
  useDeleteClassCapacityMutation,
  useGetClassCapacitiesQuery,
  useUpdateClassCapacityMutation,
} from "@/redux/services/classCapacityApi";
import { CreateClassCapacitySchema } from "@/schemas/classConfig/createClassCapacitySchema";
import { ClassCapacityData, CustomErrorData } from "@/types";
import { toast } from "sonner";

export const useClassCapacity = () => {
  const {
    data: classCapacities,
    isLoading: isLoadingClassCapacities,
    error: errorClassCapacities,
    refetch: refetchClassCapacities,
  } = useGetClassCapacitiesQuery();

  const [createClassCapacityMutation] = useCreateClassCapacityMutation();
  const [updateClassCapacityMutation] = useUpdateClassCapacityMutation();
  const [deleteClassCapacityMutation] = useDeleteClassCapacityMutation();

  /**
   * Crea una nueva capacidad de clase
   * @param body Los datos de capacidad, ver {@link CreateClassCapacitySchema}
   * @returns Una promesa que se resuelve con los datos de capacidad creados, o rechaza con un error
   */
  const createClassCapacity = async (body: CreateClassCapacitySchema) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await createClassCapacityMutation(body);
          if (
            result.error &&
            typeof result.error === "object" &&
            "data" in result.error
          ) {
            const error = (result.error.data as CustomErrorData).message;
            const message = error as string;
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
      loading: "Cargando...",
      success: "Capacidad configurada con éxito",
      error: (err) => err.message,
    });
  };

  /**
   * Actualiza una capacidad de clase
   * @param body Los datos de capacidad, ver {@link CreateClassCapacitySchema}
   * @returns Una promesa que se resuelve con los datos de capacidad actualizados, o rechaza con un error
   */
  const updateClassCapacity = async (body: ClassCapacityData) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateClassCapacityMutation(body);
          if (
            result.error &&
            typeof result.error === "object" &&
            "data" in result.error
          ) {
            const error = (result.error.data as CustomErrorData).message;
            const message = error as string;
            reject(new Error(message));
          } else if (result.error) {
            reject(
              new Error(
                "Ocurrido un error inesperado, por favor intenta de nuevo",
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
      loading: "Cargando...",
      success: "Capacidad actualizada con éxito",
      error: (err) => err.message,
    });
  };

  /**
   * Elimina una capacidad de clase
   * @param id El id de la capacidad de clase
   * @returns Una promesa que se resuelve con los datos de capacidad eliminados, o rechaza con un error
   */
  const deleteClassCapacity = async (id: string) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await deleteClassCapacityMutation(id);
          if (
            result.error &&
            typeof result.error === "object" &&
            "data" in result.error
          ) {
            const error = (result.error.data as CustomErrorData).message;
            const message = error as string;
            reject(new Error(message));
          } else if (result.error) {
            reject(
              new Error(
                "Ocurrido un error inesperado, por favor intenta de nuevo",
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
      loading: "Cargando...",
      success: "Capacidad eliminada con éxito",
      error: (err) => err.message,
    });
  };

  return {
    classCapacities,
    refetchClassCapacities,
    isLoadingClassCapacities,
    errorClassCapacities,
    createClassCapacity,
    updateClassCapacity,
    deleteClassCapacity,
  };
};
