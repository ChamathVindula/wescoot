import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Scooter } from './productTypes';

interface GetScootersResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  scooters: Scooter[];
  total: number; // Add the total property to represent the total number of scooters
}

interface GetScootersQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
  brand?: string;
  category?: string;
  motor?: string;
  maxSpeed?: number;
  maxRange?: number;
  price?: string;
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  tagTypes: ['Scooter'],
  endpoints: (builder) => ({
    getScooters: builder.query<GetScootersResponse, GetScootersQuery>({
      query: (params) => ({
        url: 'scooters',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.scooters.map(({ id }) => ({ type: 'Scooter' as const, id })),
              { type: 'Scooter', id: 'LIST' },
            ]
          : [{ type: 'Scooter', id: 'LIST' }],
    }),
    getScooterById: builder.query<Scooter, number>({
      query: (id) => `scooters/${id}`,
      providesTags: (result, error, id) => [{ type: 'Scooter', id }],
    }),
  }),
});

export const { useGetScootersQuery, useGetScooterByIdQuery } = productApi;
