import { ClassRegistrationData } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const classRegistrationApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  tagTypes: ["ClassRegistration"],
  endpoints: (build) => ({
    createClassRegistration: build.mutation<
      ClassRegistrationData,
      Partial<ClassRegistrationData>
    >({
      query: (body) => ({
        url: "/class-registration",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["ClassRegistration"],
    }),
    updateClassRegistration: build.mutation<
      ClassRegistrationData,
      Partial<ClassRegistrationData> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/class-registration/${id}`,
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["ClassRegistration"],
    }),
    getClassRegistrationById: build.query<ClassRegistrationData, string>({
      query: (id) => ({
        url: `/class-registration/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "ClassRegistration", id }],
    }),
    getClassRegistrationsAll: build.query<ClassRegistrationData[], void>({
      query: () => ({
        url: "/class-registration",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["ClassRegistration"],
    }),
    deleteClassRegistration: build.mutation<
      { success: boolean },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/class-registration/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["ClassRegistration"],
    }),
  }),
});

export const {
  useCreateClassRegistrationMutation,
  useUpdateClassRegistrationMutation,
  useGetClassRegistrationByIdQuery,
  useGetClassRegistrationsAllQuery,
  useDeleteClassRegistrationMutation,
} = classRegistrationApi;
