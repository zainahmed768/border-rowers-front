import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../network/baseUrl";
import {
  BUY_SUBSCRIPTION,
  NEWSLETTER,
  UPLOAD_IMAGE,
} from "../../network/endpoints";

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
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
  endpoints: (builder) => ({
    newsletter: builder.mutation({
      query: (email) => ({
        url: NEWSLETTER,
        method: "POST",
        body: email,
      }),
    }),
    // Challenge Subscription
    challengeSubscription: builder.mutation({
      query: (data) => ({
        url: BUY_SUBSCRIPTION,
        method: "POST",
        body: data,
      }),
    }),
    // Meter Image
    uploadImage: builder.mutation({
      query: (image) => ({
        url: UPLOAD_IMAGE,
        method: "POST",
        body: image,
      }),
    }),
  }),
});

export const {
  useNewsletterMutation,
  useChallengeSubscriptionMutation,
  useUploadImageMutation,
} = subscriptionApi;
export default subscriptionApi;
