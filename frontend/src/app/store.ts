import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { productsApi } from './sevices/products';
import { usersApi } from './sevices/user';
import { paymentApi } from './sevices/payment';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
// ...

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[paymentApi.reducerPath]: paymentApi.reducer,
		user: userReducer,
		cart: cartReducer,
		order: orderReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware, usersApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
