import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export interface Product {
	_id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	numOfReviews: number;
	reviews: {
		id: string;
		name: string;
		user: string;
		comment: string;
		rating: number;
	}[];
	rating: number;
	mainImage: {
		public_id: string;
		url: string;
	};
	detailedImages: {
		public_id: string;
		url: string;
	}[];

	category: string;
	createdAt: Date;
}

interface ProductQueryResponse {
	nextPage: number | null;
	page: number;
	products: Product[];
	success: boolean;
	highestPrice: number;
}
interface ProductResponse {
	product: Product;
	success: boolean;
}
interface CustomError {
	status: number;
	data: { message: string };
}

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4000/api/products',
	}) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
	endpoints: (builder) => ({
		getAllProducts: builder.query<ProductQueryResponse, void>({
			query: () => '',
		}),
		getProductsList: builder.query<ProductQueryResponse, string>({
			query: (query) => query,
		}),
		getAProduct: builder.query<ProductResponse, string>({
			query: (id) => `${id}`,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsListQuery, useGetAllProductsQuery, useGetAProductQuery } =
	productsApi;
