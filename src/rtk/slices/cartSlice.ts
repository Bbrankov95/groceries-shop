import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Grocerie } from "types";

type CartEntity = {
  id: Grocerie["id"];
  quantity: Grocerie["quantity"];
};

type CartState = {
  itemsById: {
    [key: CartEntity["id"]]: CartEntity;
  };
  allIds: CartEntity["id"][];
};

const initialState: CartState = {
  itemsById: {},
  allIds: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<CartEntity>) => {
      const { id, quantity } = payload;
      if (typeof state.itemsById?.[id] === "undefined") {
        state.itemsById[id] = payload;
        state.allIds.push(id);
      } else {
        state.itemsById[id] = {
          ...state.itemsById[id],
          quantity: (state.itemsById[id].quantity += quantity),
        };
      }
    },
    removeFromCart: (
      state,
      { payload: entityId }: PayloadAction<CartEntity["id"]>
    ) => {
      delete state.itemsById[entityId];
      state.allIds = state.allIds.filter((id) => entityId !== id);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
