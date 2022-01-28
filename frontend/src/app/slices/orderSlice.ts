import { createSlice } from "@reduxjs/toolkit";

interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: number;
  phoneNumber: number;
}
export interface OrderItems {
  name: string;
  price: number;
  quantity: number;
  image: string;
  productId: string;
}

export interface IOrder {
  _id: string;
  name: string;
  shippingInfo: ShippingInfo | null;
  orderItems: OrderItems[] | null;
  paymentInfo: { id: string | null; status: string | null };
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: string | null;
}

const localShipping: ShippingInfo = localStorage.getItem("shipping")
  ? JSON.parse(localStorage.getItem("shipping") || "{}")
  : null;

const initialState: IOrder = {
  _id: "",
  name: "",
  shippingInfo: localShipping,
  orderItems: null,
  paymentInfo: { id: null, status: null },
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  orderStatus: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setShipping: (
      state,
      { payload }: { payload: { shipping: ShippingInfo; name: string } }
    ) => {
      state.shippingInfo = payload.shipping;
      state.name = payload.name;
      localStorage.setItem("shipping", JSON.stringify(payload.shipping));
    },
    setOrderCart: (
      state,
      { payload }: { payload: { items: OrderItems[] } }
    ) => {
      state.orderItems = payload.items;
    },
    clearOrder: (state) => {
      state = initialState;
    },
    setOrderInfo: (
      state,
      {
        payload,
      }: {
        payload: {
          totalPrice: number;
          orderStatus: string;
          taxPrice: number;
          shippingPrice: 0;
          items: OrderItems[];
        };
      }
    ) => {
      state.totalPrice = payload.totalPrice;
      state.orderStatus = payload.orderStatus;
      state.taxPrice = payload.taxPrice;
      state.shippingPrice = payload.shippingPrice;
      state.orderItems = payload.items;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShipping, setOrderCart, setOrderInfo, clearOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
