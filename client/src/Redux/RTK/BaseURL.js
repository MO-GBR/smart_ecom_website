import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_MODE === 'development' ? import.meta.env.VITE_API_URL : "/api";

export const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        };
        headers.set('Content-Type', 'application/json');
        return headers;
    },
    credentials: 'include',
});