import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

interface GetkeyResponse {
	stripeApiKey: string;
}

interface PaymentBody {
	amount: number;
	currency: string;
}

// Define a service using a base URL and expected endpoints
export const paymentApi = createApi({
	reducerPath: 'paymentApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4000/api/payment',
	}) as BaseQueryFn<string | FetchArgs, unknown, {}>,
	endpoints: (builder) => ({
		getStripeKey: builder.query<GetkeyResponse, void>({
			query: () => ({
				url: `/key`,
				method: 'GET',
				credentials: 'include',
			}),
		}),
		postPayment: builder.query<GetkeyResponse, PaymentBody>({
			query: (body) => ({
				url: '/process',
				method: 'POST',
				body,
				credentials: 'include',
			}),
		}),
	}),
});

export const { useGetStripeKeyQuery, usePostPaymentQuery } = paymentApi;
