import { Order, OrderDetails } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

interface GetOrdersAllProps {
  date: Date | string;
  status?: string | "";
}

interface GetOrderByIdProps {
  id: string;
}

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Orders"],
  endpoints: (build) => ({
    // Obtener todos los pedidos
    getOrdersAll: build.query<Order[], GetOrdersAllProps>({
      query: ({ date, status }) => ({
        url: "/orders",
        params: { date, status },
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Orders"],
    }),

    // Obtener un pedido por id
    getOrderById: build.query<OrderDetails, GetOrderByIdProps>({
      query: ({ id }) => ({
        url: `/orders/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Orders"],
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

    // Descargar pedido en PDF
    downloadOrderPdf: build.mutation<Blob, { id: string }>({
      query: ({ id }) => ({
        url: `/orders/export/pdf/${id}`,
        method: "POST",
        responseHandler: (response: Response) => response.blob(),
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),

    // Obtener los pedidos de un cliente por su id
    getOrdersClientById: build.query<Order[], { id: string }>({
      query: ({ id }) => ({
        url: `/orders/client/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrderByIdQuery,
  useGetOrdersAllQuery,
  useUpdateOrderStatusMutation,
  useDownloadOrderPdfMutation,
  useGetOrdersClientByIdQuery,
} = ordersApi;
