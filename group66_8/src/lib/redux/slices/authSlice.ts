import { createSlice } from "@reduxjs/toolkit";

const initialState: Partial<LoginResponse> = {
  id: null,
  userName: null,
  userEmail: null,
  token: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // loginStart (state) {
    //   state.status = 'loading';
    //   state.error = undefined;
    // },
    setUser(state, action) {
      state.userName = action.payload;
      state.userEmail = action.payload;
    },
    loginSuccess(state, action) {
      state.userName = action.payload.user;
      state.id = action.payload.id;
      state.userEmail = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.userEmail = null;
      state.id = null;
      state.userName = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    loginFailed(state, action) {
      state.error = action.payload.error;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
