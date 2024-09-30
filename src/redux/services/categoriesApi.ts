import { CreateCategoriesSchema, UpdateCategoriesSchema } from "@/schemas";
import { Category } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

interface CategoryUpdate {
  data: Category;
  message: string;
  statusCode: number;
}

interface CategoryResponse {
  statusCode: number;
  message: string;
  data: Category;
}

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Categories"],
  endpoints: (build) => ({
    // Crear una nueva categoría
    createCategory: build.mutation<Category, Partial<CreateCategoriesSchema>>({
      query: (body) => ({
        url: "category",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Categories"],
    }),

    // Actualizar una categoría por id
    updateCategory: build.mutation<
      CategoryUpdate,
      UpdateCategoriesSchema & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `category/${id}`,
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Categories"],
    }),

    // Obtener todas las categorías
    getCategories: build.query<Category[], void>({
      query: () => ({
        url: "category",
        credentials: "include",
      }),
      providesTags: ["Categories"],
    }),

    // Obtener una categoría por id
    getCategoryById: build.query<Category, string>({
      query: (id) => ({
        url: `category/${id}`,
        credentials: "include",
      }),
      providesTags: ["Categories"],
    }),

    // Desactivar una categoría
    deactivateCategory: build.mutation<CategoryResponse, string>({
      query: (id) => ({
        url: `category/desactivate/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["Categories"],
    }),

    // Reactivar una categoría
    reactivateCategory: build.mutation<CategoryResponse, string>({
      query: (id) => ({
        url: `category/reactivate/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useDeactivateCategoryMutation,
  useReactivateCategoryMutation,
} = categoriesApi;
