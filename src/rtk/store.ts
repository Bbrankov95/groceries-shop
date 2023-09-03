import { configureStore } from "@reduxjs/toolkit";
import { authReducer, cartReducer, grocerieReducer } from "./slices";

const store = configureStore({
  reducer: {
    authData: authReducer,
    groceries: grocerieReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
