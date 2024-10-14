import { UpdateClientsSchema } from "@/schemas";
import { Client } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ClientUpdate {
  data: Client;
  message: string;
  statusCode: number;
}

interface ClientResponse {
  statusCode: number;
  message: string;
  data: Client;
}

export const clientsApi = createApi({
  reducerPath: "clientsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  tagTypes: ["Clients"],
  endpoints: (build) => ({
    // Obtener todos los clientes
    getClients: build.query<Client[], void>({
      query: () => ({
        url: `/admin/client`,
        credentials: "include",
      }),
      providesTags: ["Clients"],
    }),

    // Actualizar un cliente por id
    updateClient: build.mutation<
      ClientUpdate,
      UpdateClientsSchema & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/admin/client/${id}`,
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Clients"],
    }),

    // Desactivar/Reactivar un cliente por id
    toggleClientActivation: build.mutation<ClientResponse, string>({
      query: (id) => ({
        url: `/admin/client/desactivate/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["Clients"],
    }),

    // Desactivar un cliente por id
    deactivateClient: build.mutation<ClientResponse, string>({
      query: (id) => ({
        url: `/admin/client/desactivate/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["Clients"],
    }),

    // Reactivar un cliente por id
    reactivateClient: build.mutation<ClientResponse, string>({
      query: (id) => ({
        url: `/admin/client/desactivate/${id}`, // Por ahora se trabaja así la resactivación
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["Clients"],
    }),

    // Eliminar un cliente por id
    deleteClient: build.mutation<ClientResponse, string>({
      query: (id) => ({
        url: `/admin/client/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

// Exportar hooks generados para uso en componentes
export const {
  useGetClientsQuery,
  useUpdateClientMutation,
  useToggleClientActivationMutation,
  useDeactivateClientMutation,
  useReactivateClientMutation,
  useDeleteClientMutation,
} = clientsApi;
