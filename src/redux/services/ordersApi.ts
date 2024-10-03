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

    // Update status de un pedido
    updateOrderStatus: build.mutation<Order, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        credentials: "include",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrderByIdQuery,
  useGetOrdersAllQuery,
  useUpdateOrderStatusMutation,
} = ordersApi;
