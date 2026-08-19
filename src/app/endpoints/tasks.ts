import { api } from '@/app/api'
import type { CreateTaskPayload, Task, UpdateTaskPayload } from '@/types/task'

const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Task' as const, id })),
              { type: 'Task' as const, id: 'LIST' },
            ]
          : [{ type: 'Task', id: 'LIST' }],
    }),
    getUserTasks: builder.query<Task[], string>({
      query: () => '/tasks',
      transformResponse: (tasks: Task[], _meta, userId: string) =>
        tasks.filter((task) => task.assigneeId === userId || task.createdBy === userId),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Task' as const, id })),
              { type: 'Task', id: 'LIST' },
            ]
          : [{ type: 'Task', id: 'LIST' }],
    }),
    getTaskById: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Task', id }],
    }),
    createTask: builder.mutation<Task, CreateTaskPayload>({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body: { ...body, createdAt: new Date().toISOString() },
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
    updateTask: builder.mutation<Task, { id: string } & UpdateTaskPayload>({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Task', id }],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Task', id },
        { type: 'Task', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetTasksQuery,
  useGetUserTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi
