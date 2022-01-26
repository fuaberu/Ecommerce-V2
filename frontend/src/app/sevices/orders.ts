import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { IOrder } from "../slices/orderSlice";

interface OrdersResponse {
  orders: IOrder[];
  success: boolean;
}
interface OrderResponse {
  orders: IOrder;
  success: boolean;
}
interface CustomError {
  status: number;
  data: { message: string };
}

// Define a service using a base URL and expected endpoints
export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/orders",
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: (builder) => ({
    getAllOrders: builder.query<OrdersResponse, void>({
      query: () => ({
        url: `/`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAOrder: builder.query<OrderResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    createOrder: builder.mutation<OrderResponse, IOrder>({
      query: (body) => ({
        url: `/new`,
        body,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAOrderQuery,
  useGetAllOrdersQuery,
  useCreateOrderMutation,
} = ordersApi;
