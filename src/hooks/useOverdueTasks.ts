import dayjs from 'dayjs'
import { useMemo } from 'react'

import { useGetTasksQuery } from '@/app/endpoints/tasks'
import { useGetUsersQuery } from '@/app/endpoints/users'
import { isWithinPeriod, type PeriodFilter } from '@/utils/isWithinPeriod'

export type TaskReportRow = {
  key: string
  taskId: string
  name: string
  assignee: string
  status: string
  dueDate: string
  className?: string
}

export const useOverdueTasks = (period: PeriodFilter = 'week') => {
  const { data: tasks, isLoading: tasksLoading } = useGetTasksQuery()
  const { data: users, isLoading: usersLoading } = useGetUsersQuery()

  const isLoading = tasksLoading || usersLoading

  const assigneeNameMap = useMemo(() => {
    const map: Record<string, string> = {}
    for (const u of users ?? []) {
      map[u.id] = u.name
    }
    return map
  }, [users])

  const data: TaskReportRow[] = useMemo(() => {
    if (!tasks) return []

    const now = dayjs()

    return tasks
      .filter(
        (t) =>
          t.dueDate &&
          dayjs(t.dueDate).isBefore(now) &&
          t.status !== 'completed' &&
          isWithinPeriod(t.createdAt, period),
      )
      .map((t) => ({
        key: t.id,
        taskId: t.id,
        name: t.title,
        assignee: assigneeNameMap[t.assigneeId] ?? t.assigneeId,
        status: 'Просрочена',
        dueDate: dayjs(t.dueDate).locale('ru').format('D MMMM YYYY'),
        className: 'bg-red-100',
      }))
  }, [tasks, assigneeNameMap, period])

  return { data, isLoading }
}
