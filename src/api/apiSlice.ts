import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book, ResponseBooks } from '../types/types';

const BASE_URL = 'https://gutendex.com/books/';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getData: builder.query<
      ResponseBooks,
      { page: string | null; search: string | null }
    >({
      query: ({ page, search }) => {
        const params = new URLSearchParams();

        if (page) params.set('page', page);
        if (search) params.set('search', search);
        return '/?' + params.toString();
      },
    }),
    getDataById: builder.query<Book, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetDataQuery, useGetDataByIdQuery } = apiSlice;
