import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from './BaseURL';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery,
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => ({
                url: "/cart/",
                method: "GET",
            }),
        }),

        addToCart: builder.mutation({
            query: (product) => ({
                url: "/cart/add",
                method: "POST",
                body: product,
            })
        }),

        removeFromCart: builder.mutation({
            query: (productId) => ({
                url: `/cart/remove/${productId}`,
                method: "DELETE",
            }),
        }),

        clearCart: builder.mutation({
            query: () => ({
                url: "/cart/clear",
                method: "DELETE",
            }),
        }),

        updateCart: builder.mutation({
            query: ({ itemId, updatedData }) => ({
                url: `/cart/update/${itemId}`,
                method: "PUT",
                body: updatedData,
            }),
        }),
    })
});

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation, useClearCartMutation, useUpdateCartMutation } = cartApi;