import { ClassesDataAdmin } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const classApi = createApi({
  reducerPath: "classApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Class Admin"],
  endpoints: (build) => ({
    // Obtener todas las clases
    getAllClasses: build.query<
      ClassesDataAdmin[],
      { date?: string | undefined }
    >({
      query: ({ date }) => ({
        url: "/admin/class",
        method: "GET",
        params: { date },
        credentials: "include",
      }),
      providesTags: ["Class Admin"],
    }),
  }),
});
export const { useGetAllClassesQuery } = classApi;
