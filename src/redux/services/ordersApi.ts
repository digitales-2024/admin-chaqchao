import { Order } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Orders"],
  endpoints: (build) => ({
    // Obtener todos los pedidos
    getOrdersAll: build.query<
      Order[],
      { date: Date | string; status?: string | "" }
    >({
      query: ({ date, status }) => ({
        url: "/orders",
        params: { date, status },
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Orders"],
    }),

    // Obtener un pedido por id
    getOrderById: build.query<Order, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),
  }),
});

export const { useGetOrderByIdQuery, useGetOrdersAllQuery } = ordersApi;
