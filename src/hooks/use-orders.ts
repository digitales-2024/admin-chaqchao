"use client";
import { useGetOrdersAllQuery } from "@/redux/services/ordersApi";
import { socket } from "@/socket/socket";

export const useOrders = (dateFilter: Date | string, status?: string) => {
  const date =
    typeof dateFilter === "string" ? dateFilter : dateFilter.toISOString();

  const {
    data: dataOrders,
    isLoading: isLoadingOrders,
    error: errorOrders,
    refetch: refetchOrders,
  } = useGetOrdersAllQuery({ date, status });

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
