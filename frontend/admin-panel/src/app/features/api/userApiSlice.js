import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApiSlice = createApi({
    reducerPath : 'userApi',
    baseQuery : fetchBaseQuery({baseUrl : '/api'}),
    endpoints : (builder) => ({
        login : builder.mutation({
            query : (credentials) => ({
                url : 'auth/login',
                method : 'POST',
                body : credentials
            }),
        }),
        register : builder.mutation({
            query : (credentials) => ({
                url : 'auth/register',
                method : 'POST',
                body : credentials
            }),
        }),
        logout : builder.mutation({
            query : () => ({
                url : 'auth/logout',
                method : 'POST',
            }),
        }),
    })
})

export const {useLoginMutation, useRegisterMutation, useLogoutMutation} = userApiSlice;

export default userApiSlice