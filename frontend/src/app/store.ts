import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { productsApi } from './sevices/products';
import { usersApi } from './sevices/user';
import userReducer from './slices/user';
// ...

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		user: userReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware, usersApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
