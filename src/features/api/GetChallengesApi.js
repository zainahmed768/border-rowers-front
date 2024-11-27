"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  CHALLENGCONTENT,
  CHALLENGES,
  DROP_CHALLENGE,
  MY_CHALLENGES,
} from "../../network/endpoints";
import { baseURL } from "../../network/baseUrl";

const AllChallenges = createApi({
  reducerPath: "AllChallenges",
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
      // Get All Challenges
      challengeContent: builder.query({
        query: (page) => {
          return {
            url: `${CHALLENGES}?${new URLSearchParams(page).toString()}`,
            method: "Get",
          };
        },
      }),

      // Get Challenge Intro
      challengeIntro: builder.query({
        query: () => {
          return {
            url: CHALLENGCONTENT,
            method: "Get",
          };
        },
      }),

      // Get single Challenge
      challengeDetailContent: builder.query({
        query: (slug) => {
          return {
            url: `${CHALLENGES}/${slug}`,
            method: "Get",
          };
        },
      }),

      // Get User Challenges
      getUserChallenge: builder.query({
        query: (param, filter_by) => {
          return {
            url: `${MY_CHALLENGES}?${new URLSearchParams(param).toString()}&${new URLSearchParams(filter_by).toString()}`,
            method: "Get",
          };
        },
      }),

      // Drop User Challenge
      dropUserChallenge: builder.query({
        query: (id) => {
          return {
            url: `${DROP_CHALLENGE}/${id}`,
            method: "GET",
          };
        },
      }),

      // Get Single User Challenges
      getSingleChallenge: builder.query({
        query: (id) => {
          return {
            url: `${MY_CHALLENGES}/${id}`,
            method: "Get",
          };
        },
      }),
    };
  },
});

export const {
  useChallengeContentQuery,
  useChallengeDetailContentQuery,
  useChallengeIntroQuery,
  useGetUserChallengeQuery,
  useGetSingleChallengeQuery,
  useLazyDropUserChallengeQuery,
} = AllChallenges;
export default AllChallenges;
