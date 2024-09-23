import { BusinessHoursData, AllBusinessHoursData } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const businessHoursApi = createApi({
  reducerPath: "businessHoursApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  tagTypes: ["BusinessHours"],
  endpoints: (build) => ({
    createBusinessHour: build.mutation<
      BusinessHoursData,
      Partial<BusinessHoursData>
    >({
      query: (body) => ({
        url: "/business-hours",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["BusinessHours"],
    }),
    updateBusinessHour: build.mutation<
      BusinessHoursData,
      Partial<BusinessHoursData> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/business-hours/${id}`,
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["BusinessHours"],
    }),
    getBusinessHourById: build.query<BusinessHoursData, string>({
      query: (id) => ({
        url: `/business-hours/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "BusinessHours", id }],
    }),
    getBusinessHoursAll: build.query<AllBusinessHoursData, void>({
      query: () => ({
        url: "/business-hours",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["BusinessHours"],
    }),
  }),
});

export const {
  useCreateBusinessHourMutation,
  useUpdateBusinessHourMutation,
  useGetBusinessHourByIdQuery,
  useGetBusinessHoursAllQuery,
} = businessHoursApi;
