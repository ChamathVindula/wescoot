import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CreatePaymentIntentRequest, ConfirmPaymentRequest, PaymentIntentResponse } from './paymentTypes';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/payments/' }),
  tagTypes: ['PaymentIntent'],
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<PaymentIntentResponse, CreatePaymentIntentRequest>({
      query: (data) => ({
        url: 'create-payment-intent',
        method: 'POST',
        body: data,
      }),
    }),
    confirmPayment: builder.mutation<PaymentIntentResponse, ConfirmPaymentRequest>({
      query: (data) => ({
        url: 'confirm-payment',
        method: 'POST',
        body: data,
      }),
    }),
    getPaymentIntent: builder.query<PaymentIntentResponse, string>({
      query: (id) => `payment-intent/${id}`,
      providesTags: (result, error, id) => [{ type: 'PaymentIntent', id }],
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useConfirmPaymentMutation,
  useGetPaymentIntentQuery,
} = paymentApi;