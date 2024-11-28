import { ClaimsResponse } from "@/types/claim";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const claimApi = createApi({
  reducerPath: "claimApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Claim"],
  endpoints: (build) => ({
    // Endpoint para obtener todos los reclamos
    getAllClaims: build.query<ClaimsResponse, { date?: string }>({
      query: ({ date }) => ({
        url: `/claims`,
        method: "GET",
        params: { date },
        credentials: "include",
      }),
      providesTags: ["Claim"],
    }),
  }),
});

export const { useGetAllClaimsQuery } = claimApi;
