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
      keepUnusedDataFor: 0,
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: `${getUrl(Endpoint.PRODUCTS)}/add`,
        method: HttpMethod.Post,
        body: product,
        headers: {
          Authorization: `your-secret-token`,
        },
      }),
      invalidatesTags: ['products'],
    }),
    updateProduct: builder.mutation<Product, { productId: number; quantity?: number; price?: number }>({
      query: ({ productId, ...patchData }) => ({
        url: `${getUrl(Endpoint.PRODUCTS)}/${productId}/update`,
        method: HttpMethod.Put,
        body: patchData,
        headers: {
          Authorization: `your-secret-token`,
        },
      }),
      invalidatesTags: ['products'],
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation} = productApi;
