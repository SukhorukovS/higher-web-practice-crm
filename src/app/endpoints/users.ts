import { api } from '@/app/api'
import type { LoginPayload, RegisterPayload, UpdateProfilePayload, User } from '@/types/user'

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),
    login: builder.query<User, LoginPayload>({
      query: (credentials) => ({
        url: '/users',
        params: { email: credentials.email, password: credentials.password },
      }),
      transformResponse: (users: User[]) => users[0],
    }),
    register: builder.mutation<User, RegisterPayload>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body: { ...body, createdAt: new Date().toISOString() },
      }),
      invalidatesTags: ['User'],
    }),
    updateProfile: builder.mutation<User, { id: string } & UpdateProfilePayload>({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useLazyLoginQuery,
  useRegisterMutation,
  useUpdateProfileMutation,
} = usersApi
