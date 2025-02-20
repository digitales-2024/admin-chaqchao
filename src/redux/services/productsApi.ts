import { ApiResponse, ProductData } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";
import { reportsApi } from "./reportsApi";

interface UploadImageResponse {
  statusCode: number;
  message: string;
  data: string;
}

interface UploadMultipleImagesResponse {
  statusCode: number;
  message: string;
  data: string[];
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product"],
  endpoints: (build) => ({
    // Crear un nuevo producto
    createProduct: build.mutation<
      ApiResponse<ProductData>,
      Partial<ProductData>
    >({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    // Actualizar un producto por id
    updateProduct: build.mutation<
      ProductData,
      Partial<ProductData> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body,
        credentials: "include",
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
      providesTags: (result, error, id) => [{ type: "Product", id }],
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

    // Subir Imagenes de un Producto a CloudFlare
    uploadProductImage: build.mutation<
      UploadImageResponse,
      { formData: FormData; signal: AbortSignal }
    >({
      query: ({ formData, signal }) => ({
        url: "products/upload/image",
        method: "POST",
        body: formData,
        credentials: "include",
        signal,
      }),
      invalidatesTags: ["Product"],
    }),

    // Actualizar Imagenes de un Producto en CloudFlare
    updateProductImage: build.mutation<
      UploadImageResponse,
      { formData: FormData; existingFileName: string }
    >({
      query: ({ formData, existingFileName }) => ({
        url: `products/update/image/${existingFileName}`,
        method: "PATCH",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),

    // Subir múltiples imágenes para un producto
    uploadMultipleProductImages: build.mutation<
      UploadMultipleImagesResponse,
      { productId: string; formData: FormData }
    >({
      query: ({ productId, formData }) => ({
        url: `products/${productId}/images`,
        method: "POST",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),

    // Eliminar permanentemente un producto por su id
    deleteProductPermanent: build.mutation<
      { success: boolean },
      { productId: string }
    >({
      query: ({ productId }) => ({
        url: `products/permanent/${productId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
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
  useUploadProductImageMutation,
  useUpdateProductImageMutation,
  useUploadMultipleProductImagesMutation,
  useDeleteProductPermanentMutation,
} = productsApi;
