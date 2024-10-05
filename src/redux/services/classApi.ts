import { ClassesDataAdmin } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const classApi = createApi({
  reducerPath: "classApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Class Admin"],
  endpoints: (build) => ({
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
  }),
});

export const {
  useGetAllClassesQuery,
  useExportClassesToExcelMutation,
  useExportClassesToPdfMutation,
} = classApi;
