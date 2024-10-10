"use client";
import {
  useGetNewClientsQuery,
  useGetOrderAllMonthQuery,
  useGetTopProductsQuery,
} from "@/redux/services/dataApi";

interface Data {
  startDate: string;
  endDate: string;
}

export const useData = (
  { startDate, endDate }: Data = {
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  },
) => {
  const { data } = useGetOrderAllMonthQuery(
    {
      startDate,
      endDate,
    },
    {
      skip: startDate === null || endDate === null,
    },
  );

  const { data: topProducts } = useGetTopProductsQuery(
    {
      startDate,
      endDate,
    },
    {
      skip: startDate === null || endDate === null,
    },
  );

  const { data: newClients } = useGetNewClientsQuery(
    {
      startDate,
      endDate,
    },
    {
      skip: startDate === null || endDate === null,
    },
  );

  return {
    data,
    topProducts,
    newClients,
  };
};
