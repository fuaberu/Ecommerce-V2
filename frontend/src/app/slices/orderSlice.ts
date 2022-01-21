import { createSlice } from '@reduxjs/toolkit';
import { Types } from 'mongoose';
import { CartState } from './cartSlice';

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

interface IOrder {
	shippingInfo: ShippingInfo | null;
	orderItems: OrderItems[] | null;
	paymentInfo: { id: string | null; status: string | null };
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number | null;
	orderStatus: string | null;
}

const localShipping: ShippingInfo = localStorage.getItem('shipping')
	? JSON.parse(localStorage.getItem('shipping') || '{}')
	: null;

const initialState: IOrder = {
	shippingInfo: localShipping,
	orderItems: null,
	paymentInfo: { id: null, status: null },
	taxPrice: 0,
	shippingPrice: 0,
	totalPrice: null,
	orderStatus: null,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		setShipping: (state, { payload }: { payload: { shipping: ShippingInfo } }) => {
			state.shippingInfo = payload.shipping;
			localStorage.setItem('shipping', JSON.stringify(payload.shipping));
		},
		setOrderCart: (state, { payload }: { payload: { items: OrderItems[] } }) => {
			state.orderItems = payload.items;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setShipping, setOrderCart } = orderSlice.actions;

export default orderSlice.reducer;
