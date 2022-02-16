import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

interface IUser {
  name: string;
  email: string;
  password: number;
  profilePic: string;
  role: string;
  passwordToken: string;
  createdAt: Date;
}

interface UserResponse {
  success: boolean;
  token: string;
  user: IUser;
}

interface UserLoadResponse {
  success: boolean;
  user: IUser;
}

interface CustomError {
  status: number;
  data: { message: string };
}

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/users",
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      UserResponse,
      { name: string; password: string; email: string }
    >({
      query: ({ name, password, email }) => ({
        url: `/create`,
        method: "POST",
        body: { name, password, email },
        credentials: "include",
      }),
    }),
    loginUser: builder.mutation<
      UserResponse,
      { password: string; email: string }
    >({
      query: ({ password, email }) => ({
        url: `/login`,
        method: "POST",
        body: { password, email },
        credentials: "include",
      }),
    }),
    logOutUser: builder.mutation<UserResponse, void>({
      query: () => ({
        url: `/logout`,
        method: "GET",
        credentials: "include",
      }),
    }),
    loadUser: builder.mutation<UserLoadResponse, void>({
      query: () => ({
        url: `/me`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateProfilePic: builder.mutation<UserLoadResponse, { url: string }>({
      query: (body) => ({
        url: `/update/profile`,
        method: "PUT",
        body,
        credentials: "include",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserMutation,
  useLogOutUserMutation,
  useUpdateProfilePicMutation,
} = usersApi;
