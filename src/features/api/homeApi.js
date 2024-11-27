"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../network/baseUrl";
import { HOME } from "../../network/endpoints";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    
  }),
  endpoints: (builder) => ({
    getHomeContent: builder.query({
      query: (params) => ({
        url: `${HOME}?${new URLSearchParams(params).toString()}`,
      }),
    }),
  }),
});

export const { useGetHomeContentQuery } = homeApi;
export default homeApi;
