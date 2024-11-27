"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  POSTCARDS,
  POSTCARDS_VISIBILITY,
  TROPHIES,
  TROPHY_VISIBILITY,
  UPLOAD_METER_IMAGE,
} from "../../network/endpoints";
import { baseURL } from "../../network/baseUrl";

const GetUserStuff = createApi({
  reducerPath: "GetUserStuff",
  tagTypes: ["postcardVisibility", "trophyVisibility"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.AuthReducer?.userToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      headers.set("Access-Control-Allow-Origin", "*");
     
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      // Get All PostCards
      getPostCards: builder.query({
        query: (params) => ({
          url: `${POSTCARDS}?${new URLSearchParams(params).toString()}`,
          method: "GET",
        }),
        providesTags: ["postcardVisibility"],
      }),

      // Change Visibility
      postcardVisibility: builder.query({
        query: (id, visibility) => ({
          url: `${POSTCARDS_VISIBILITY}?${new URLSearchParams(
            id
          ).toString()}&${new URLSearchParams(visibility).toString()}`,
          method: "GET",
        }),
        invalidatesTags: ["postcardVisibility"],
      }),

      // Get Trophies
      getTrohpies: builder.query({
        query: (params) => ({
          url: `${TROPHIES}?${new URLSearchParams(params).toString()}`,
          method: "GET",
        }),
        providesTags: ["trophyVisibility"],
      }),

      // Update Trophy Visibility
      trophyVisibility: builder.query({
        query: (id, visibility) => ({
          url: `${TROPHY_VISIBILITY}?${new URLSearchParams(
            id
          ).toString()}&${new URLSearchParams(visibility).toString()}`,
          method: "GET",
        }),
        invalidatesTags: ["trophyVisibility"],
      }),

      // Update Status
      updateMeterImage: builder.mutation({
        query: (image) => ({
          url: UPLOAD_METER_IMAGE,
          method: "POST",
          body: image,
        }),
      }),
    };
  },
});

export const {
  useGetPostCardsQuery,
  usePostcardVisibilityQuery,
  useGetTrohpiesQuery,
  useTrophyVisibilityQuery,
  useUpdateMeterImageMutation,
} = GetUserStuff;
export default GetUserStuff;
