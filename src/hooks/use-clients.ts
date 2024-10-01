import {
  useGetClientsQuery,
  useUpdateClientMutation,
  useToggleClientActivationMutation,
  useDeactivateClientMutation,
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

  // Manejar la actualización de un cliente
  const onUpdateClient = async (input: Partial<Client> & { id: string }) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateClient(input);
          if (result.error && "data" in result.error) {
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

  return {
    dataClientsAll, // Datos de los clientes obtenidos
    error, // Error en la obtención de clientes
    isLoading, // Indicador de carga
    onUpdateClient, // Función para actualizar cliente
    isSuccessUpdateClient, // Indicador de éxito en la actualización
    isLoadingUpdateClient, // Indicador de carga en la actualización
    onToggleClientActivation, // Función para activar/desactivar cliente
    isSuccessToggleClient, // Indicador de éxito en activación/desactivación
    onDeactivateClient, // Función para desactivar cliente
    isSuccessDeactivateClient, // Indicador de éxito en desactivación
  };
};
