import { ClassPriceConfigData } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const classPriceApi = createApi({
  reducerPath: "classPriceApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
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
    getClassPricesAll: build.query<ClassPriceConfigData[], void>({
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
  }),
});

export const {
  useCreateClassPriceMutation,
  useUpdateClassPriceMutation,
  useGetClassPriceByIdQuery,
  useGetClassPricesAllQuery,
  useDeleteClassPriceMutation,
} = classPriceApi;
