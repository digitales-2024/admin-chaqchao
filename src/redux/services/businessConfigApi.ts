import { BusinessConfigData } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const businessConfigApi = createApi({
  reducerPath: "businessConfigApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  tagTypes: ["BusinessConfig"],
  endpoints: (build) => ({
    // Mutación para crear una configuración de negocio
    createBusinessConfig: build.mutation<
      BusinessConfigData, // Respuesta esperada
      {
        businessName: string;
        contactNumber: string;
        email: string;
        address: string;
      } // Parámetros de entrada
    >({
      query: (body) => ({
        url: "/business-config",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["BusinessConfig"],
    }),

    // Mutación para actualizar una configuración de negocio
    updateBusinessConfig: build.mutation<
      BusinessConfigData, // Respuesta esperada
      {
        id: string;
        businessName?: string;
        contactNumber?: string;
        email?: string;
        address?: string;
      } // Parámetros de entrada
    >({
      query: ({ id, ...body }) => ({
        url: `/business-config/${id}`,
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["BusinessConfig"],
    }),

    // Consulta para obtener una configuración de negocio por ID
    getBusinessConfigById: build.query<
      BusinessConfigData, // Respuesta esperada
      string // ID como parámetro
    >({
      query: (id) => ({
        url: `/business-config/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "BusinessConfig", id }],
    }),

    getBusinessConfigAll: build.query<BusinessConfigData[], void>({
      query: () => ({
        url: "/business-config",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["BusinessConfig"],
    }),
  }),
});

export const {
  useCreateBusinessConfigMutation,
  useUpdateBusinessConfigMutation,
  useGetBusinessConfigByIdQuery,
  useGetBusinessConfigAllQuery,
} = businessConfigApi;
