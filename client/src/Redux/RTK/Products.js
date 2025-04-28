import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './BaseURL';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery,
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/product/',
        }),

        getProductById: builder.query({
            query: (id) => `/product/${id}`,
        }),

        addProduct: builder.mutation({
            query: (product) => ({
                url: '/product/new',
                method: 'POST',
                body: product,
            }),
        }),

        updateProduct: builder.mutation({
            query: ({ id, product }) => ({
                url: `/product/update/${id}`,
                method: 'PUT',
                body: product,
            }),
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi;