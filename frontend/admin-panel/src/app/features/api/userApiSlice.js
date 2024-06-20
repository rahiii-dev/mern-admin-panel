import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    editProfile: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: "/user",
        method: "DELETE",
        body: id,
      }),
    }),
    getUserById: builder.query({
      query : (id) => ({
        url : `/user/${id}`
      })
    }),
    listusers: builder.query({
      query : () => ({
        url : '/users'
      })
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation,
     useEditProfileMutation, useListusersQuery, useDeleteUserMutation, useGetUserByIdQuery } =
  userApiSlice;

export default userApiSlice;
