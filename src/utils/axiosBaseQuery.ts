import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { ApiResponse } from '@/models/api.model';

import { BACKEND_API_URL } from './environmentUtils';

const axiosBaseQuery =
  (
    baseUrl = BACKEND_API_URL,
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      body?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    ApiResponse<unknown>
  > =>
    async ({ url, method, body, params, headers = {} }) => {

      try {
        const result = await axios({
          url: baseUrl + `/${url}`,
          method,
          data: body,
          params,
          headers: {
            ...headers,
          },
        });
        if (result.data.success)
          return { data: result.data.data };

        return {
          error: result.data.message,
        };
      } catch (error: any) {
        if (error instanceof AxiosError) {
          return {
            error: {
              status: error.response?.status,
              data: error.response?.data,
            },
          };
        }
        return { error };
      }
    };

export default axiosBaseQuery;
