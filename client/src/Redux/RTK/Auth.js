import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from './BaseURL';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
                credentials: 'include',
            }),
        }),

        login: builder.mutation({
            query: (userData) => ({
                url: '/auth/login',
                method: 'POST',
                body: userData,
                credentials: 'include',
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                credentials: 'include',
            }),
        }),

        forgetPassword: builder.mutation({
            query: (email) => ({
                url: '/auth/forget',
                method: 'PUT',
                body: email,
                credentials: 'include',
            }),
        }),

        resetPassword: builder.mutation({
            query: ({resetToken, resetInput}) => ({
                url: `/auth/resetpassword/${resetToken}`,
                method: 'PUT',
                body: resetInput,
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useForgetPasswordMutation,
    useResetPasswordMutation,
} = authApi;