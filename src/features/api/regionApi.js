"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseURL } from "../../network/baseUrl";
import { CITIES, COUNTRYLIST, STATES } from "../../network/endpoints";

export const regionsApi = createApi({
  reducerPath: "regions",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  endpoints: (builder) => ({
    getCountryList: builder.query({
      query: () => ({
        url: COUNTRYLIST,
      }),
    }),
    getStates: builder.query({
      query: (id) => ({
        url: `${STATES}/${id}`,
      }),
    }),
    getCities: builder.query({
      query: (id) => ({
        url: `${CITIES}/${id}`,
      }),
    }),
  }),
});

export const { useGetCitiesQuery, useGetCountryListQuery, useGetStatesQuery } =
  regionsApi;
export default regionsApi;
