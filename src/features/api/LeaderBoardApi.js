"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { LEADERBOARD, LEADERBOARD_PATICIPANT } from "../../network/endpoints";
import { baseURL } from "../../network/baseUrl";

const LeaderBoardApi = createApi({
  reducerPath: "LeaderBoardApi",
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
      leaderboardContent: builder.query({
        query: (params) => {
          return {
            url: `${LEADERBOARD}?call_by=web&${new URLSearchParams(params).toString()}`,
            method: "Get",
          };
        },
      }),
      getParticipantData: builder.query({
        query: (id) => {
          return {
            url: `${LEADERBOARD_PATICIPANT}/${id}`,
            method: "Get",
          };
        },
      }),
    };
  },
});

export const { useLeaderboardContentQuery, useLazyGetParticipantDataQuery } =
  LeaderBoardApi;
export default LeaderBoardApi;
