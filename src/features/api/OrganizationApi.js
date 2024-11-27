import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../network/baseUrl";
import {
  CREATE_CHALLENGE,
  CREATE_FREE_CHALLENGE,
  DELETE_CHALLENGE,
  DELETE_POSTCARD,
  UPDATE_CHALLENGE,
  VIEW_USERS,
} from "../../network/endpoints";

export const organizationApi = createApi({
  reducerPath: "organizationApi",
  tagTypes: ["deleteChellenge"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.AuthReducer?.userToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    createChallenge: builder.mutation({
      query: (newChallenge) => ({
        url: CREATE_CHALLENGE,
        method: "POST",
        body: newChallenge,
      }),
    }),
    createFreeChallenge: builder.mutation({
      query: (newChallenge) => ({
        url: CREATE_FREE_CHALLENGE,
        method: "POST",
        body: newChallenge,
      }),
    }),
    // Edit Challenge
    editChallenge: builder.mutation({
      query: ({ id, data }) => ({
        url: `${UPDATE_CHALLENGE}/${id}`,
        method: "POST",
        body: data,
      }),
    }),

    // Get All Challenges / View and Manage Challenge
    getOrgChallenges: builder.query({
      query: (params) => ({
        url: `${CREATE_CHALLENGE}?${new URLSearchParams(params).toString()}`,
        method: "GET",
      }),
      providesTags: ["deleteChellenge"],
    }),

    // view users by challenge
    viewUsers: builder.query({
      query: (slug) => ({
        url: `${VIEW_USERS}/${slug}`,
        method: "GET",
      }),
    }),

    // Get All Challenges by slug in View and Manage Challenge
    viewChallenge: builder.query({
      query: (slug) => ({
        url: `${CREATE_CHALLENGE}/${slug}`,
        method: "GET",
      }),
    }),

    // Delete Challenge
    deleteChallenge: builder.mutation({
      query: (id) => ({
        url: `${DELETE_CHALLENGE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteChellenge"],
    }),

    // Delete Challenge
    deletePostcard: builder.mutation({
      query: (id) => ({
        url: `${DELETE_POSTCARD}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateChallengeMutation,
  useCreateFreeChallengeMutation,
  useEditChallengeMutation,
  useViewUsersQuery,
  useGetOrgChallengesQuery,
  useViewChallengeQuery,
  useDeleteChallengeMutation,
  useDeletePostcardMutation,
} = organizationApi;
export default organizationApi;
