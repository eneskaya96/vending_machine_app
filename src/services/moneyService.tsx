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
    }),
    insertMoney: builder.mutation<void, { moneyTypeId: string }>({
      query: (data) => ({
        url: 'insert-money',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetMoneyTypesQuery, useInsertMoneyMutation } = moneyApi;
