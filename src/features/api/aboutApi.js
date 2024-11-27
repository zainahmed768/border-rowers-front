"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../network/baseUrl";
import { ABOUT } from "../../network/endpoints";

export const aboutApi = createApi({
  reducerPath: "aboutApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getAboutContent: builder.query({
      query: (params) => `${ABOUT}?${new URLSearchParams(params).toString()}`,
    }),
  }),
});

export const { useGetAboutContentQuery } = aboutApi;
export default aboutApi;
