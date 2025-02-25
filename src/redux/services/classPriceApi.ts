import { ClassPriceConfigData, TypeClassPricesData } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";
export const classPriceApi = createApi({
  reducerPath: "classPriceApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["ClassPrice"],
  endpoints: (build) => ({
    createClassPrice: build.mutation<
      ClassPriceConfigData,
      Partial<ClassPriceConfigData>
    >({
      query: (body) => ({
        url: "/class-price",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["ClassPrice"],
    }),
    updateClassPrice: build.mutation<
      ClassPriceConfigData,
      Partial<ClassPriceConfigData> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/class-price/${id}`,
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["ClassPrice"],
    }),
    getClassPriceById: build.query<ClassPriceConfigData, string>({
      query: (id) => ({
        url: `/class-price/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "ClassPrice", id }],
    }),
    getClassPricesAll: build.query<TypeClassPricesData, void>({
      query: () => ({
        url: "/class-price",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["ClassPrice"],
    }),
    deleteClassPrice: build.mutation<{ success: boolean }, { id: string }>({
      query: ({ id }) => ({
        url: `/class-price/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["ClassPrice"],
    }),

    // Precios dolares de un tipo de clase
    getClassPricesByTypeClass: build.query<
      ClassPriceConfigData[],
      { typeClass: string; typeCurrency?: string }
    >({
      query: ({ typeClass, typeCurrency = "USD" }) => ({
        url: `/class-price/${typeCurrency}/${typeClass}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["ClassPrice"],
    }),
  }),
});

export const {
  useCreateClassPriceMutation,
  useUpdateClassPriceMutation,
  useGetClassPriceByIdQuery,
  useGetClassPricesAllQuery,
  useDeleteClassPriceMutation,
  useGetClassPricesByTypeClassQuery,
} = classPriceApi;
