import { api } from '@/app/api'
import type { Client, CreateClientPayload, UpdateClientPayload } from '@/types/client'

const clientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<Client[], void>({
      query: () => '/clients',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Client' as const, id })),
              { type: 'Client' as const, id: 'LIST' },
            ]
          : [{ type: 'Client', id: 'LIST' }],
    }),
    getClientById: builder.query<Client, string>({
      query: (id) => `/clients/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Client', id }],
    }),
    createClient: builder.mutation<Client, CreateClientPayload>({
      query: (body) => ({
        url: '/clients',
        method: 'POST',
        body: { ...body, createdAt: new Date().toISOString() },
      }),
      invalidatesTags: [{ type: 'Client', id: 'LIST' }],
    }),
    updateClient: builder.mutation<Client, { id: string } & UpdateClientPayload>({
      query: ({ id, ...patch }) => ({
        url: `/clients/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Client', id }],
    }),
    deleteClient: builder.mutation<Client, string>({
      query: (id) => ({
        url: `/clients/${id}`,
        method: 'PATCH',
        body: { deleted: true },
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Client', id },
        { type: 'Client', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApi
