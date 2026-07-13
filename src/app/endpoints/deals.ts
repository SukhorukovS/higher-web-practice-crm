import { api } from '@/app/api'
import type { CreateDealPayload, Deal, UpdateDealPayload } from '@/types/deal'

const dealsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDeals: builder.query<Deal[], void>({
      query: () => '/deals',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Deal' as const, id })),
              { type: 'Deal' as const, id: 'LIST' },
            ]
          : [{ type: 'Deal', id: 'LIST' }],
    }),
    getDealById: builder.query<Deal, string>({
      query: (id) => `/deals/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Deal', id }],
    }),
    createDeal: builder.mutation<Deal, CreateDealPayload>({
      query: (body) => ({
        url: '/deals',
        method: 'POST',
        body: { ...body, createdAt: new Date().toISOString() },
      }),
      invalidatesTags: [{ type: 'Deal', id: 'LIST' }],
    }),
    updateDeal: builder.mutation<Deal, { id: string } & UpdateDealPayload>({
      query: ({ id, ...patch }) => ({
        url: `/deals/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Deal', id }],
    }),
    deleteDeal: builder.mutation<void, string>({
      query: (id) => ({
        url: `/deals/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Deal', id },
        { type: 'Deal', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetDealsQuery,
  useGetDealByIdQuery,
  useCreateDealMutation,
  useUpdateDealMutation,
  useDeleteDealMutation,
} = dealsApi
