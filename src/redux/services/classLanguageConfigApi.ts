import { ClassLanguageData } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const classLanguageApi = createApi({
  reducerPath: "classLanguageApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  tagTypes: ["ClassLanguage"],
  endpoints: (build) => ({
    createClassLanguage: build.mutation<
      ClassLanguageData,
      Partial<ClassLanguageData>
    >({
      query: (body) => ({
        url: "/class-language",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["ClassLanguage"],
    }),
    updateClassLanguage: build.mutation<
      ClassLanguageData,
      Partial<ClassLanguageData> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/class-language/${id}`,
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["ClassLanguage"],
    }),
    getClassLanguageById: build.query<ClassLanguageData, string>({
      query: (id) => ({
        url: `/class-language/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "ClassLanguage", id }],
    }),
    getClassLanguagesAll: build.query<ClassLanguageData[], void>({
      query: () => ({
        url: "/class-language",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["ClassLanguage"],
    }),
    deleteClassLanguage: build.mutation<{ success: boolean }, { id: string }>({
      query: ({ id }) => ({
        url: `/class-language/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["ClassLanguage"],
    }),
  }),
});

export const {
  useCreateClassLanguageMutation,
  useUpdateClassLanguageMutation,
  useGetClassLanguageByIdQuery,
  useGetClassLanguagesAllQuery,
  useDeleteClassLanguageMutation,
} = classLanguageApi;
