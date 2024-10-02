import { Order } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Orders"],
  endpoints: (build) => ({
    updateOrder: build.mutation<Order, Partial<Order> & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrderById: build.query<Order, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),
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
    deleteOrder: build.mutation<{ success: boolean }, { id: string }>({
      query: ({ id }) => ({
        url: `/orders/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useUpdateOrderMutation,
  useGetOrderByIdQuery,
  useGetOrdersAllQuery,
  useDeleteOrderMutation,
} = ordersApi;
