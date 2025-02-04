import {
  useGetClientsQuery,
  useUpdateClientMutation,
  useToggleClientActivationMutation,
  useDeactivateClientMutation,
  useReactivateClientMutation, // Importa el hook para reactivar cliente
} from "@/redux/services/clientsApi";
import { Client } from "@/types";
import { toast } from "sonner";

// Hook personalizado para manejar operaciones con clientes
export const useClients = () => {
  // Obtener clientes
  const { data: dataClientsAll, error, isLoading } = useGetClientsQuery();

  // Actualizar cliente
  const [
    updateClient,
    { isSuccess: isSuccessUpdateClient, isLoading: isLoadingUpdateClient },
  ] = useUpdateClientMutation();

  // Activar/Desactivar cliente
  const [toggleClientActivation, { isSuccess: isSuccessToggleClient }] =
    useToggleClientActivationMutation();

  // Desactivar cliente
  const [deactivateClient, { isSuccess: isSuccessDeactivateClient }] =
    useDeactivateClientMutation();

  // Reactivar cliente
  const [
    reactivateClient,
    {
      isSuccess: isSuccessReactivateClient,
      isLoading: isLoadingReactivateClient,
    },
  ] = useReactivateClientMutation(); // Asegúrate de que este hook esté definido en tu servicio de API

  // Manejar la actualización de un cliente
  const onUpdateClient = async (input: Partial<Client> & { id: string }) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateClient(input);
          if (result.error && "data" in result.error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const error = (result.error.data as any).message;
            reject(new Error(error));
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
      success: "Cliente actualizado",
      error: (error) => {
        return error.message;
      },
    });
  };

  // Manejar la activación/desactivación de un cliente
  const onToggleClientActivation = async (id: string) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await toggleClientActivation(id);
          if (result.error && "data" in result.error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const error = (result.error.data as any).message;
            reject(new Error(error));
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
      loading: "Procesando...",
      success: "Cliente actualizado",
      error: (error) => {
        return error.message;
      },
    });
  };

  // Manejar la desactivación de un cliente
  const onDeactivateClient = async (id: string) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await deactivateClient(id);
          if (result.error && "data" in result.error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const error = (result.error.data as any).message;
            reject(new Error(error));
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
      loading: "Desactivando cliente...",
      success: "Cliente desactivado exitosamente",
      error: (error) => error.message,
    });
  };

  // Manejar la reactivación de un cliente
  const onReactivateClient = async (id: string) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await reactivateClient(id);
          if (result.error && "data" in result.error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const error = (result.error.data as any).message;
            reject(new Error(error));
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
      loading: "Reactivando cliente...",
      success: "Cliente reactivado exitosamente",
      error: (error) => error.message,
    });
  };

  return {
    dataClientsAll,
    error,
    isLoading,
    onUpdateClient,
    isSuccessUpdateClient,
    isLoadingUpdateClient,
    onToggleClientActivation,
    isSuccessToggleClient,
    onDeactivateClient,
    isSuccessDeactivateClient,
    onReactivateClient, // Agregar la función para reactivar clientes
    isSuccessReactivateClient, // Agregar el indicador de éxito de reactivación
    isLoadingReactivateClient, // Agregar el indicador de carga de reactivación
  };
};
