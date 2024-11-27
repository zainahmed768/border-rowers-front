import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../network/baseUrl";
import {
  AUTH,
  EDIT_ORG,
  EDIT_PROFILE,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_RESET,
  GET_PROFILE,
  LOGIN,
  LOGOUT,
  ORG_REGISTERATION,
  RESET_PASSWORD,
  UPDATE_IMAGE,
  USER_REGISTERATION,
  VERIFY_OTP,
} from "../../network/endpoints";

export const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["updateUser", "user", "org"],
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
    // Register User
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: AUTH + USER_REGISTERATION,
        method: "POST",
        body: newUser,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }),
    }),
    // Register Organization
    registerOrg: builder.mutation({
      query: (newOrg) => ({
        url: AUTH + ORG_REGISTERATION,
        method: "POST",
        body: newOrg,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }),
    }),
    // Login Mutation
    login: builder.mutation({
      query: (loginCreds) => ({
        url: `${AUTH + LOGIN}?type=user-login`,
        method: "POST",
        body: loginCreds,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }),
    }),
    // Logout Mutation
    logout: builder.mutation({
      query: () => ({
        url: LOGOUT,
        method: "POST",
      }),
    }),
    // Password Reset
    forgotPasswordReset: builder.mutation({
      query: (passwords) => ({
        url: AUTH + FORGOT_PASSWORD_RESET,
        method: "POST",
        body: passwords,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }),
    }),
    // Password Reset
    forgotPassword: builder.mutation({
      query: (userEmail) => ({
        url: `${AUTH + FORGOT_PASSWORD}?type=web`,
        method: "POST",
        body: userEmail,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }),
    }),
    // Verify OTP
    verifyOtp: builder.mutation({
      query: (otpInput) => ({
        url: AUTH + VERIFY_OTP,
        method: "POST",
        body: otpInput,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }),
    }),
    updatePassword: builder.mutation({
      query: (passInputs) => ({
        url: AUTH + RESET_PASSWORD,
        method: "POST",
        body: passInputs,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: GET_PROFILE,
        method: "get",
      }),
      providesTags: ["updateUser"],
    }),
    editUser: builder.mutation({
      query: (userInfo) => ({
        url: EDIT_PROFILE,
        method: "POST",
        body: userInfo,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }),
      invalidatesTags: ["updateUser"],
    }),
    editOrg: builder.mutation({
      query: (userInfo) => ({
        url: EDIT_ORG,
        method: "POST",
        body: userInfo,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }),
      invalidatesTags: ["updateUser"],
    }),
    updateImage: builder.mutation({
      query: (dp) => ({
        url: UPDATE_IMAGE,
        method: "POST",
        body: dp,
      }),
      invalidatesTags: ["updateUser"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useRegisterOrgMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useUpdatePasswordMutation,
  useOrgLoginMutation,
  useEditUserMutation,
  useGetUserQuery,
  useUpdateImageMutation,
  useForgotPasswordResetMutation,
  useLogoutMutation,
  useEditOrgMutation,
} = authApi;
export default authApi;
