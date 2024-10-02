"use client";
import { useGetOrdersAllQuery } from "@/redux/services/ordersApi";

export const useOrders = (date: Date | string) => {
  const formattedDate = typeof date === "string" ? date : date.toISOString();

  const {
    data: dataOrders,
    isLoading: isLoadingOrders,
    error: errorOrders,
  } = useGetOrdersAllQuery(formattedDate);

  return {
    dataOrders,
    isLoadingOrders,
    errorOrders,
  };
};
