import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  isLoggedIn: false,
};

if (initialState.token) {
  initialState.isLoggedIn = true;
}

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.idToken;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      localStorage.setItem("token", state.token);
      localStorage.setItem("email", state.email);
    },
    logout(state) {
      state.token = null;
      state.email = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
