import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

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
  mainImage: string;
  detailedImages: string[];
  category: string;
  createdAt: Date;
}

export interface NewProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  numOfReviews: number;
  mainImage: string;
  detailedImages: string[];
  category: string;
}

interface ProductQueryResponse {
  nextPage: number | null;
  page: number;
  products: Product[];
  success: boolean;
  highestPrice: number;
  categories: string[];
}
interface ProductResponse {
  product: Product;
  success: boolean;
}
interface CategoriesResponse {
  categories: string[];
  success: boolean;
}
interface CustomError {
  status: number;
  data: { message: string };
}

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/products",
  }) as BaseQueryFn<string | CustomError | FetchArgs, unknown, CustomError, {}>,
  endpoints: (builder) => ({
    //all
    getAllProducts: builder.query<ProductQueryResponse, void>({
      query: () => "/",
    }),
    getProductsList: builder.query<ProductQueryResponse, string>({
      query: (query) => query,
    }),
    getAProduct: builder.query<ProductResponse, string>({
      query: (id) => `${id}`,
    }),
    //user
    getProductsCategories: builder.query<CategoriesResponse, void>({
      query: () => ({
        url: `/categories`,
        method: "GET",
        credentials: "include",
      }),
    }),
    setProductStock: builder.mutation<
      ProductResponse,
      { data: { id: string; quantity: number }[] }
    >({
      query: ({ data }) => ({
        url: `/stock`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    //admin
    updateProduct: builder.mutation<
      ProductResponse,
      { productId: string; body: any }
    >({
      query: ({ productId, body }) => ({
        url: `/${productId}`,
        method: "PUT",
        body,
        credentials: "include",
      }),
    }),
    createProduct: builder.mutation<ProductResponse, NewProduct>({
      query: (body) => ({
        url: `/admin/new`,
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    deleteProduct: builder.mutation<ProductResponse, string>({
      query: (productId) => ({
        url: `/admin/${productId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsListQuery,
  useGetAllProductsQuery,
  useGetAProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsCategoriesQuery,
  useSetProductStockMutation,
} = productsApi;
