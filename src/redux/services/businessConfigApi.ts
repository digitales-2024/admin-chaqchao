import { BusinessConfigData } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const businessConfigApi = createApi({
  reducerPath: "businessConfigApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  tagTypes: ["BusinessConfig"],
  endpoints: (build) => ({
    createBusinessConfig: build.mutation<
      BusinessConfigData,
      Partial<BusinessConfigData>
    >({
      query: (body) => ({
        url: "/business-config",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["BusinessConfig"],
    }),
    updateBusinessConfig: build.mutation<
      BusinessConfigData,
      Partial<BusinessConfigData> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/business-config/${id}`,
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["BusinessConfig"],
    }),
    getBusinessConfigById: build.query<BusinessConfigData, string>({
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
