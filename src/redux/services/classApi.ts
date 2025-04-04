import { createClassSchema } from "@/schemas";
import { ClassesDataAdmin, TypeClass } from "@/types";
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

    // Obtener las clases futuras
    getClassesFutures: build.query<
      ClassesDataAdmin[],
      { typeClass?: TypeClass; schedule?: string }
    >({
      query: ({ typeClass, schedule }) => ({
        url: "/class/admin/futures",
        method: "GET",
        params: { typeClass, schedule },
        credentials: "include",
      }),
      providesTags: ["Class Admin"],
    }),

    // Verificar la existencia de una clase
    checkClassExist: build.query<
      ClassesDataAdmin,
      { schedule?: string; date: string; typeClass: TypeClass }
    >({
      query: ({ schedule, date, typeClass }) => ({
        url: "/class/admin/check-class",
        method: "GET",
        params: { schedule, date, typeClass },
        credentials: "include",
      }),
      providesTags: ["Class Admin"],
    }),

    // Cerrar una clase
    closeClass: build.mutation<ClassesDataAdmin, string>({
      query: (id) => ({
        url: `/class/admin/close/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["Class Admin"],
    }),

    // Capacidad de las clases
    // Obtener capacidad de las clases
    getClassesCapacity: build.query<
      {
        id: string;
        typeClass: TypeClass;
        minCapacity: number;
        maxCapacity: number;
      },
      { typeClass?: TypeClass }
    >({
      query: ({ typeClass }) => ({
        url: "/class/admin/capacity",
        method: "GET",
        params: { typeClass },
        credentials: "include",
      }),
      providesTags: ["Class Admin"],
    }),
    // Endpoint para obtener los precios
    prices: build.query<
      {
        id: string;
        classTypeUser: string;
        price: number;
        typeCurrency: string;
      }[],
      { typeCurrency?: string; typeClass: "NORMAL" | "GROUP" | "PRIVATE" }
    >({
      query: (args) => ({
        url: "/classes/prices",
        method: "GET",
        params: {
          typeCurrency: args.typeCurrency || "DOLAR",
          typeClass: args.typeClass,
        },
        credentials: "include",
      }),
      providesTags: ["Class Admin"],
    }),
  }),
});

export const {
  useCreateClassMutation,
  useGetAllClassesQuery,
  useExportClassesToExcelMutation,
  useExportClassesToPdfMutation,
  useGetClassesFuturesQuery,
  useCheckClassExistQuery,
  useCloseClassMutation,
  useGetClassesCapacityQuery,
  usePricesQuery,
} = classApi;
