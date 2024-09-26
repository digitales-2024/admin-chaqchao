import { categoriesSchema } from "@/schemas";
import { Category } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CategoryUpdate {
  data: Category;
  message: string;
  statusCode: number;
}

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  tagTypes: ["Categories"],
  endpoints: (build) => ({
    // Crear una nueva categoría
    createCategory: build.mutation<typeof categoriesSchema, Partial<Category>>({
      query: (body) => ({
        url: "category",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Categories"],
    }),

    // Actualizar una categoría por id /category/:id
    updateCategory: build.mutation<CategoryUpdate, Partial<Category>>({
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

    // Obtener una categoría por id /category/:id
    getCategoryById: build.query<Category, string>({
      query: (id) => ({
        url: `category/${id}`,
        credentials: "include",
      }),
      providesTags: ["Categories"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
} = categoriesApi;
