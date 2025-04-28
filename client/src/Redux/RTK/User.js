import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './BaseURL';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery,
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `/user/${id}`,
        }),

        getAllUsers: builder.query({
            query: () => '/user/',
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'DELETE',
            }),
        }),
    })
});

export const { useGetUserQuery, useGetAllUsersQuery, useDeleteUserMutation } = userApi;