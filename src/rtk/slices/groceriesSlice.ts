import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Grocerie, Groceries } from "types";

type GroceriesState = {
  byId: { [key: Grocerie["id"]]: Grocerie };
  allIds: Array<Grocerie["id"]>;
};

const initialState: GroceriesState = {
  byId: {},
  allIds: [],
};

const groceriesSlice = createSlice({
  name: "groceries",
  initialState,
  reducers: {
    insertGroceries: (state, { payload }: PayloadAction<Groceries>) => {
      if (!Array.isArray(payload)) return;
      for (const grocerie of payload) {
        const { id } = grocerie;
        if (typeof state.byId?.[id] === "undefined") {
          state.byId[id] = grocerie;
          state.allIds.push(id);
        }
      }
    },
  },
});

export const { insertGroceries } = groceriesSlice.actions;

export default groceriesSlice.reducer;
