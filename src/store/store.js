import { configureStore } from "@reduxjs/toolkit";
import authApi from "../features/api/AuthApi";
import homeApi from "../features/api/homeApi";
import AllChallenges from "../features/api/GetChallengesApi";
import aboutApi from "../features/api/aboutApi";
import pagesApi from "../features/api/pagesApi";
import regionsApi from "../features/api/regionApi";
import LeaderBoardApi from "../features/api/LeaderBoardApi";
import AuthReducer, { role } from "../features/reducers/AuthReducer";
import GetUserStuff from "../features/api/GetUserStuff";
import subscriptionApi from "../features/api/subscriptionApi";
import organizationApi from "../features/api/OrganizationApi";
import thunk from "redux-thunk";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, AuthReducer);

export const store = configureStore({
  reducer: {
    AuthReducer: persistedReducer,
    [authApi.reducerPath]: authApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [aboutApi.reducerPath]: aboutApi.reducer,
    [AllChallenges.reducerPath]: AllChallenges.reducer,
    [pagesApi.reducerPath]: pagesApi.reducer,
    [LeaderBoardApi.reducerPath]: LeaderBoardApi.reducer,
    [regionsApi.reducerPath]: regionsApi.reducer,
    [GetUserStuff.reducerPath]: GetUserStuff.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [organizationApi.reducerPath]: organizationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      [authApi.middleware],
      [homeApi.middleware],
      [aboutApi.middleware],
      [pagesApi.middleware],
      [AllChallenges.middleware],
      [LeaderBoardApi.middleware],
      [regionsApi.middleware],
      [GetUserStuff.middleware],
      [subscriptionApi.middleware],
      [organizationApi.middleware],
      [thunk]
    ),
});

export default store;
