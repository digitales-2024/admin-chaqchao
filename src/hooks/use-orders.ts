"use client";
import { useGetOrdersAllQuery } from "@/redux/services/ordersApi";

export const useOrders = (dateFilter: Date | string, status?: string) => {
  const date =
    typeof dateFilter === "string" ? dateFilter : dateFilter.toISOString();

  const {
    data: dataOrders,
    isLoading: isLoadingOrders,
    error: errorOrders,
  } = useGetOrdersAllQuery({ date, status });

  return {
    dataOrders,
    isLoadingOrders,
    errorOrders,
  };
};
