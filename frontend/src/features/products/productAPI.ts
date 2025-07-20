import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Scooter } from './productTypes';

interface GetScootersResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  scooters: Scooter[];
  limit: number;
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
  tagTypes: ['Scooter', 'Brands'],
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
    getScooterById: builder.query<Scooter, string>({
      query: (id) => `scooters/${id}`,
      providesTags: (result, error, id) => [{ type: 'Scooter', id }],
    }),
    getScooterBrands: builder.query<string[], void>({
      query: () => 'scooters/brands',
      providesTags: ['Brands'],
    }),
  }),
});

export const { useGetScootersQuery, useGetScooterByIdQuery, useGetScooterBrandsQuery } = productApi;
