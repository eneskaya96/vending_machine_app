// services/moneyService.ts
import { createApi } from '@reduxjs/toolkit/query/react';

import { HttpMethod } from '@/models/api.model';
import { MoneyType } from '@/models/money.model'; 
import axiosBaseQuery from '@/utils/axiosBaseQuery';

import getUrl, { Endpoint } from './endpoints';

export const moneyApi = createApi({
  reducerPath: 'moneyApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['money-type'],
  endpoints: (builder) => ({
    getMoneyTypes: builder.query<MoneyType[], void>({
      query: () => ({
        url: `${getUrl(Endpoint.MONEY_TYPES)}`,
        method: HttpMethod.Get,
      }),
      providesTags: ['money-type'],
      keepUnusedDataFor: 0,
    }),
    updateMoneyTypeQuantity: builder.mutation<MoneyType, { moneyTypeId: number; quantity: number;token: string }>({
      query: ({ moneyTypeId, quantity, token }) => ({
        url: `${getUrl(Endpoint.MONEY_TYPES)}/${moneyTypeId}/update-quantity`,
        method: 'PUT',
        body: { quantity },
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ['money-type'],
    }),
  }),
});

export const { useGetMoneyTypesQuery, useUpdateMoneyTypeQuantityMutation } = moneyApi;
