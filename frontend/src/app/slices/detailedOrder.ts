import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../sevices/products";
import { IOrder } from "./orderSlice";

export interface DetailedOrderState {
  order: IOrder | null;
}

const initialState: DetailedOrderState = {
  order: null,
};

export const detailedOrderSlice = createSlice({
  name: "detailedOrder",
  initialState: initialState,
  reducers: {
    setDetailedOrder: (
      state: DetailedOrderState,
      { payload }: { payload: { order: IOrder } }
    ) => {
      state.order = payload.order;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDetailedOrder } = detailedOrderSlice.actions;

export default detailedOrderSlice.reducer;
