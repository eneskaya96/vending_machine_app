import { createApi } from '@reduxjs/toolkit/query/react';

import { HttpMethod } from '@/models/api.model';
import { TransactionSession } from '@/models/transactionSession.model';
import axiosBaseQuery from '@/utils/axiosBaseQuery';

import getUrl, { Endpoint } from './endpoints';

export const transactionSessionApi = createApi({
  reducerPath: 'transactionSessionApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['transactionSession'],
  endpoints: (builder) => ({
    startSession: builder.mutation<TransactionSession, void>({
      query: () => ({
        url: `${getUrl(Endpoint.TRANSACTION_SESSIONS)}/start`,
        method: HttpMethod.Post,
      }),
    }),
    insertMoney: builder.mutation<void, { sessionId: number; denomination: string; quantity: number }>({
      query: ({ sessionId, denomination, quantity }) => ({
        url: `${getUrl(Endpoint.TRANSACTION_SESSIONS)}/add-money?sessionId=${sessionId}`,
        method: HttpMethod.Post,
        body: {
          denomination,
          quantity
        }
      }),
    }),
    getCurrentTotal: builder.query<number, string>({
      query: (sessionId) => ({
        url: `${getUrl(Endpoint.TRANSACTION_SESSIONS)}/current-total/${sessionId}`,
        method: HttpMethod.Get,
      }),
    }),
    refundMoney: builder.mutation<void, string>({
      query: (sessionId) => ({
        url: `${getUrl(Endpoint.TRANSACTION_SESSIONS)}/refund`,
        method: HttpMethod.Post,
        params: { sessionId }
      }),
    }),
    purchaseProduct: builder.mutation<PurchaseResult, { sessionId: number; productId: number }>({
      query: ({ sessionId, productId }) => ({
        url: `${getUrl(Endpoint.TRANSACTION_SESSIONS)}/${sessionId}/purchase-product`,
        method: 'POST',
        body: { productId }
      }),
    }),
  }),
});

export const {useStartSessionMutation, useInsertMoneyMutation, useGetCurrentTotalQuery, useRefundMoneyMutation, usePurchaseProductMutation} = transactionSessionApi;
