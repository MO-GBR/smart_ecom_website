import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from './BaseURL';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery,
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: '/order/new',
                method: 'POST',
                body: order,
            }),
        }),
        getOrders: builder.query({
            query: () => '/order/',
        }),
    })
});

export const { useCreateOrderMutation, useGetOrdersQuery } = orderApi;