"use client";
import { useGetOrdersAllQuery } from "@/redux/services/ordersApi";

import { useSocket } from "./use-socket";

export const useOrders = (dateFilter: Date | string, status?: string) => {
  const date =
    typeof dateFilter === "string" ? dateFilter : dateFilter.toISOString();

  const {
    data: dataOrders,
    isLoading: isLoadingOrders,
    error: errorOrders,
    refetch: refetchOrders,
  } = useGetOrdersAllQuery({ date, status });

  const { socket } = useSocket();

  socket.on("new-order", () => {
    refetchOrders();
  });

  return {
    dataOrders,
    isLoadingOrders,
    errorOrders,
    refetchOrders,
  };
};
