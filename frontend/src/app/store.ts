import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { productsApi } from "./sevices/products";
import { usersApi } from "./sevices/user";
import { paymentApi } from "./sevices/payment";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import detailedOrderReducer from "./slices/detailedOrder";
import { ordersApi } from "./sevices/orders";
// ...

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    detailedOrder: detailedOrderReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      usersApi.middleware,
      paymentApi.middleware,
      ordersApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
