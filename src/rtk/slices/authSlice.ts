import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";

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

export const getAuthData = (state: RootState) => state.authData;

export default authSlice.reducer;
