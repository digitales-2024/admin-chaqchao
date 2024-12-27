import { createClassSchema } from "@/schemas";
import { ClassesDataAdmin } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const classApi = createApi({
  reducerPath: "classApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Class Admin"],
  endpoints: (build) => ({
    // Crear una nueva clase
    createClass: build.mutation<
      ClassesDataAdmin,
      createClassSchema | { isClosed: boolean; typeCurrency: string }
    >({
      query: (data) => ({
        url: "/class/admin",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Class Admin"],
    }),

    // Obtener todas las clases
    getAllClasses: build.query<ClassesDataAdmin[], { date?: string }>({
      query: ({ date }) => ({
        url: "/class/admin",
        method: "GET",
        params: { date },
        credentials: "include",
      }),
      providesTags: ["Class Admin"],
    }),
    // Exportar clases a Excel
    exportClassesToExcel: build.mutation<Blob, ClassesDataAdmin[]>({
      query: (data) => ({
        url: "/class/admin/export/classes/excel",
        method: "POST",
        body: data,
        responseHandler: (response: Response) => response.blob(),
        credentials: "include",
      }),
    }),
    // Exportar clases a PDF
    exportClassesToPdf: build.mutation<Blob, ClassesDataAdmin[]>({
      query: (data) => ({
        url: "/class/admin/export/classes/pdf",
        method: "POST",
        body: data,
        responseHandler: (response: Response) => response.blob(),
        credentials: "include",
      }),
    }),

    // Obtener las clases cerradas de un mes
    getClosedClasses: build.query<
      ClassesDataAdmin[],
      { date: string; schedule?: string }
    >({
      query: ({ date, schedule }) => ({
        url: "/class/admin/closed",
        method: "GET",
        params: { date, schedule },
        credentials: "include",
      }),
      providesTags: ["Class Admin"],
    }),

    // Verificar la existencia de una clase
    checkClassExist: build.query<
      ClassesDataAdmin,
      { schedule?: string; date: string }
    >({
      query: ({ schedule, date }) => ({
        url: "/class/admin/check-class",
        method: "GET",
        params: { schedule, date },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateClassMutation,
  useGetAllClassesQuery,
  useExportClassesToExcelMutation,
  useExportClassesToPdfMutation,
  useGetClosedClassesQuery,
  useCheckClassExistQuery,
} = classApi;
