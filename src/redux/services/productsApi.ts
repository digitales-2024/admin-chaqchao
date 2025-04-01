import { ApiResponse, ProductData } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";
import { reportsApi } from "./reportsApi";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product"],
  endpoints: (build) => ({
    // Crear un nuevo producto
    createProduct: build.mutation<ApiResponse<ProductData>, FormData>({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData,
        credentials: "include",
        // No incluir Content-Type, el navegador lo establecerá automáticamente con el boundary correcto
      }),
      invalidatesTags: ["Product"],
    }),
    // Actualizar un producto por id
    updateProduct: build.mutation<
      ProductData,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: formData,
        credentials: "include",
        // No incluir Content-Type, el navegador lo establecerá automáticamente con el boundary correcto
      }),
      invalidatesTags: ["Product"],
    }),
    // Obtener un producto por id
    getProductById: build.query<ProductData, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Product"],
    }),
    // Obtener todos los productos
    getAllProducts: build.query<ProductData[], void>({
      query: () => ({
        url: "/products",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Product"],
    }),
    // Eliminar un producto por id
    deleteProduct: build.mutation<{ success: boolean }, { id: string }>({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    // Eliminar varios productos
    deleteProducts: build.mutation<void, { ids: string[] }>({
      query: (ids) => ({
        url: "products/remove/all",
        method: "DELETE",
        body: ids,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    // Activar o desactivar un producto
    toggleProductActivation: build.mutation<ProductData, { id: string }>({
      query: ({ id }) => ({
        url: `/products/toggleactivation/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    // Reactivar varios productos
    reactivateProducts: build.mutation<void, { ids: string[] }>({
      query: (ids) => ({
        url: "products/reactivate/all",
        method: "PATCH",
        body: ids,
        credentials: "include",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            reportsApi.endpoints.getProductsReport.initiate(
              { filter: {} },
              {
                forceRefetch: true,
              },
            ),
          );
        } catch (error) {
          console.error(error);
        }
      },
      invalidatesTags: ["Product"],
    }),

    downloadCVS: build.mutation<Blob, void>({
      query: () => ({
        url: "/products/export/excel",
        method: "POST",
        credentials: "include",
        responseHandler: async (response: Response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useToggleProductActivationMutation,
  useReactivateProductsMutation,
  useDeleteProductsMutation,
  useDownloadCVSMutation,
} = productsApi;
