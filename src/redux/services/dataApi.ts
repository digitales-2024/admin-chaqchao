import { Client, Order } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

interface GetDataAllProps {
  startDate: Date | string;
  endDate: Date | string;
}

interface Product {
  id: string;
  name: string;
  totalOrdered: number;
}

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Data"],
  endpoints: (build) => ({
    // Obtener todos los datos
    getOrderAllMonth: build.query<Order[], GetDataAllProps>({
      query: ({ startDate, endDate }) => ({
        url: "/reports/orders",
        params: { startDate, endDate },
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Data"],
    }),

    // Obtener un top de los productos más vendidos
    getTopProducts: build.query<Product[], GetDataAllProps>({
      query: ({ startDate, endDate }) => ({
        url: "/reports/top-products",
        params: { startDate, endDate },
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Data"],
    }),

    // Obtener los cliente que se han registrado en el mes
    getNewClients: build.query<Client[], GetDataAllProps>({
      query: ({ startDate, endDate }) => ({
        url: "/admin/client/all",
        params: { startDate, endDate },
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Data"],
    }),
  }),
});

export const {
  useGetOrderAllMonthQuery,
  useGetTopProductsQuery,
  useGetNewClientsQuery,
} = dataApi;
