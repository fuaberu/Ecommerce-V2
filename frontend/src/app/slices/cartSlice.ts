import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../sevices/products";

export interface ICartItem {
  value: Product;
  quantity: number;
}

export interface CartState {
  cartItems: ICartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const localCart: CartState = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") || "{}")
  : null;

export const cartSlice = createSlice({
  name: "cart",
  initialState: localCart ? localCart : initialState,
  reducers: {
    addProduct: (
      state: CartState,
      { payload }: { payload: { value: Product; quantity: number } }
    ) => {
      const itemExists = state.cartItems.findIndex(
        (item) => item.value._id === payload.value._id
      );
      if (itemExists > -1) {
        state.cartItems[itemExists].quantity += payload.quantity;
      } else {
        state.cartItems.push(payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state));
    },
    setProductQuantity: (
      state: CartState,
      { payload }: { payload: { id: string; quantity: number } }
    ) => {
      const itemExists = state.cartItems.findIndex(
        (item) => item.value._id === payload.id
      );
      if (itemExists > -1) {
        state.cartItems[itemExists].quantity = payload.quantity;
        localStorage.setItem("cartItems", JSON.stringify(state));
      }
    },
    removeProduct: (
      state: CartState,
      { payload }: { payload: { id: string } }
    ) => {
      const itemExists = state.cartItems.findIndex(
        (item) => item.value._id === payload.id
      );
      if (itemExists > -1) {
        state.cartItems.splice(itemExists, 1);
        localStorage.setItem("cartItems", JSON.stringify(state));
      }
    },
    clearCart: (state: CartState) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, setProductQuantity, removeProduct, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
