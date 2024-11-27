"use cient";
// import { persistor } from "@//StoreProvider";
import { createSlice } from "@reduxjs/toolkit";

// const token =
//   typeof window !== "undefined"
//     ? JSON.parse(localStorage.getItem("userToken"))
//     : null;

const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState: {
    userToken: "",
    user: {},
    isLoggedIn: false,
    // isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.userToken = action?.payload?.token;
      state.user = action?.payload?.user;
      state.isLoggedIn = true;
      // state.isAuthenticated = true;
    },
    userLogout: (state) => {
      localStorage.setItem("modal", true);
      state.user = {};
      state.userToken = null;
      state.isLoggedIn = false;
      // state.isAuthenticated = false;
    },
  },
});

export const { setUser, userLogout, updatedProfile } = AuthReducer.actions;
export default AuthReducer.reducer;
