"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseURL } from "../../network/baseUrl";
import { LEGALPAGES, PAGES } from "../../network/endpoints";

export const pagesApi = createApi({
  reducerPath: "pages",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  endpoints: (builder) => ({
    getAllPages: builder.query({
      query: (slug) => ({
        url: `${LEGALPAGES}/${slug}`,
      }),
    }),
    pageMetas: builder.query({
      query: () => ({
        url: PAGES,
      }),
    }),
  }),
});

export const { useGetAllPagesQuery, usePageMetasQuery } = pagesApi;
export default pagesApi;
