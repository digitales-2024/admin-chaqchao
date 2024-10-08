import { ProductData } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

interface UploadImageResponse {
  statusCode: number;
  message: string;
  data: string;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product"],
  endpoints: (build) => ({
    // Crear un nuevo producto
    createProduct: build.mutation<ProductData, Partial<ProductData>>({
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
      invalidatesTags: ["Product"],
    }),

    // Subir Imagenes de un Producto a CloudFlare
    uploadProductImage: build.mutation<UploadImageResponse, FormData>({
      query: (formData) => ({
        url: "products/upload/image",
        method: "POST",
        body: formData,
        credentials: "include",
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
} = productsApi;
