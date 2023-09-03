import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isLogged: boolean;
};

const initialState: AuthState = {
  isLogged: false,
};

export const authSlice = createSlice({
  name: "authData",
  initialState,
  reducers: {
    setisLogged: (state, { payload }: PayloadAction<AuthState>) => {
      state.isLogged = payload.isLogged;
    },
  },
});

export const { setisLogged } = authSlice.actions;

export default authSlice.reducer;
