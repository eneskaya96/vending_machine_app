import { createApi } from '@reduxjs/toolkit/query/react';

import { HttpMethod } from '@/models/api.model';
import { Product } from '@/models/product.model';
import axiosBaseQuery from '@/utils/axiosBaseQuery';

import getUrl, { Endpoint } from './endpoints';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['products'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: `${getUrl(Endpoint.PRODUCTS)}`,
        method: HttpMethod.Get,
      }),
      providesTags: ['products'],
    }),
  }),
});

export const { useGetProductsQuery} = productApi;
