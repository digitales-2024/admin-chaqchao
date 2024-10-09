import { FilterOrdersSchema } from "@/schemas/reports/filterOrdersSchema";
import { FilterProductSchema } from "@/schemas/reports/filterProductSchema";
import { Order, ProductData } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const reportsApi = createApi({
  reducerPath: "reportsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Report"],
  endpoints: (build) => ({
    // Obtener reporte de órdenes
    getOrdersReport: build.query<Order, { filter: FilterOrdersSchema }>({
      query: ({ filter }) => ({
        url: "/reports/orders",
        method: "GET",
        params: filter,
        credentials: "include",
      }),
      providesTags: ["Report"],
    }),
    // Obtener reporte de productos
    getProductsReport: build.query<
      ProductData,
      { filter: FilterProductSchema }
    >({
      query: ({ filter }) => ({
        url: "/reports/products",
        method: "GET",
        params: filter,
        credentials: "include",
      }),
      providesTags: ["Report"],
    }),
    // Exportar reporte de órdenes a PDF
    exportOrdersToPdf: build.mutation<Blob, { filter: FilterOrdersSchema }>({
      query: ({ filter }) => ({
        url: "/reports/export/order/pdf",
        method: "GET",
        params: filter,
        responseHandler: (response: Response) => response.blob(),
        credentials: "include",
      }),
    }),
    // Exportar reporte de órdenes a Excel
    exportOrdersToExcel: build.mutation<Blob, { filter: FilterOrdersSchema }>({
      query: ({ filter }) => ({
        url: "/reports/export/order/excel",
        method: "GET",
        params: filter,
        responseHandler: (response: Response) => response.blob(),
        credentials: "include",
      }),
    }),
    // Exportar reporte de productos a PDF
    exportProductsToPdf: build.mutation<Blob, { filter: FilterProductSchema }>({
      query: ({ filter }) => ({
        url: "/reports/export/product/pdf",
        method: "GET",
        params: filter,
        responseHandler: (response: Response) => response.blob(),
        credentials: "include",
      }),
    }),
    // Exportar reporte de productos a Excel
    exportProductsToExcel: build.mutation<
      Blob,
      { filter: FilterProductSchema }
    >({
      query: ({ filter }) => ({
        url: "/reports/export/product/excel",
        method: "GET",
        params: filter,
        responseHandler: (response: Response) => response.blob(),
        credentials: "include",
      }),
    }),
    // Obtener reporte de productos top
    getTopProducts: build.query<ProductData, { filter: FilterProductSchema }>({
      query: ({ filter }) => ({
        url: "/reports/top-products",
        method: "GET",
        params: filter,
        credentials: "include",
      }),
      providesTags: ["Report"],
    }),
    // Exportar reporte de productos top a PDF
    exportTopProductsToPdf: build.mutation<
      Blob,
      { filter: FilterProductSchema }
    >({
      query: ({ filter }) => ({
        url: "/reports/export/top-product/pdf",
        method: "GET",
        params: filter,
        responseHandler: (response: Response) => response.blob(),
        credentials: "include",
      }),
    }),
    // Exportar reporte de productos top a Excel
    exportTopProductsToExcel: build.mutation<
      Blob,
      { filter: FilterProductSchema }
    >({
      query: ({ filter }) => ({
        url: "/reports/export/top-product/excel",
        method: "GET",
        params: filter,
        responseHandler: (response: Response) => response.blob(),
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetOrdersReportQuery,
  useGetProductsReportQuery,
  useExportOrdersToPdfMutation,
  useExportOrdersToExcelMutation,
  useExportProductsToPdfMutation,
  useExportProductsToExcelMutation,
  useGetTopProductsQuery,
  useExportTopProductsToPdfMutation,
  useExportTopProductsToExcelMutation,
} = reportsApi;
