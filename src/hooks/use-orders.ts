"use client";
import {
  useGetOrderByIdQuery,
  useGetOrdersAllQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/services/ordersApi";
import { socket } from "@/socket/socket";
import { CustomErrorData } from "@/types";
import { translateError } from "@/utils/translateError";
import { useEffect } from "react";
import { toast } from "sonner";

type StatusTranslations = {
  [key: string]: string;
};

const OrderStatusEs = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  READY: "Listo",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
};

interface UseOrdersProps {
  id?: string;
  status?: string;
  dateFilter?: Date | string;
}

export const useOrders = (options: UseOrdersProps = {}) => {
  const { dateFilter: date, status, id } = options;
  const {
    data: dataOrders,
    isLoading: isLoadingOrders,
    error: errorOrders,
    refetch: refetchOrders,
  } = useGetOrdersAllQuery(
    { date: date as string, status },
    {
      skip: !date || !status, // Evita hacer la query si no hay date o status
    },
  );

  const { data: orderById, refetch: refetchOrderById } = useGetOrderByIdQuery(
    { id: id as string },
    {
      skip: !id, // Evita hacer la query si no hay id
    },
  );

  const [
    updateOrderStatus,
    { isLoading: isLoadingUpdateOrderStatus, error: errorUpdateOrderStatus },
  ] = useUpdateOrderStatusMutation();

  // Manejo de eventos del socket
  useEffect(() => {
    const handleNewOrder = () => {
      // Si ya tenemos data cargada, permitimos el refetch
      if (dataOrders) {
        refetchOrders();
      }
    };

    const handleOrderStatusUpdated = () => {
      // Si ya tenemos data cargada, permitimos el refetch
      if (dataOrders) {
        refetchOrders();
        if (id) {
          refetchOrderById();
        }
      }
    };

    socket.on("new-order", handleNewOrder);
    socket.on("order-status-updated", handleOrderStatusUpdated);

    // Limpieza de los listeners del socket
    return () => {
      socket.off("new-order", handleNewOrder);
      socket.off("order-status-updated", handleOrderStatusUpdated);
    };
  }, [dataOrders, refetchOrders, refetchOrderById, id]);

  const onOrderStatusUpdate = (id: string, status: string) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateOrderStatus({ id, status });
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

    function translateStatus(status: string) {
      const translations: StatusTranslations = OrderStatusEs;
      return translations[status] || status;
    }
    return toast.promise(promise(), {
      loading: "Actualizando estado del pedido...",
      success: `Estado de pedido a ${translateStatus(status)} actualizado`,
      error: (err) => err.message,
    });
  };

  return {
    dataOrders,
    isLoadingOrders,
    errorOrders,
    refetchOrders,
    onOrderStatusUpdate,
    isLoadingUpdateOrderStatus,
    errorUpdateOrderStatus,
    orderById,
  };
};
