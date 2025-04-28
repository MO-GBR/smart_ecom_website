import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from './BaseURL';

export const passportApi = createApi({
    reducerPath: 'passportApi',
    baseQuery,
    endpoints: (builder) => ({
        loginWithGoogle: builder.query({
            query: () => '/oauth/google/success',
        })
    })
});

export const { useLoginWithGoogleQuery } = passportApi;