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
    for (const user of users ?? []) {
      map[user.id] = user.name
    }
    return map
  }, [users])

  const data: TaskReportRow[] = useMemo(() => {
    if (!tasks) return []

    const now = dayjs()

    return tasks
      .filter(
        (task) =>
          task.dueDate &&
          dayjs(task.dueDate).isBefore(now) &&
          task.status !== 'completed' &&
          isWithinPeriod(task.createdAt, period),
      )
      .map((task) => ({
        key: task.id,
        taskId: task.id,
        name: task.title,
        assignee: assigneeNameMap[task.assigneeId],
        status: 'Просрочена',
        dueDate: dayjs(task.dueDate).locale('ru').format('D MMMM YYYY'),
        className: 'bg-red-100',
      }))
  }, [tasks, assigneeNameMap, period])

  return { data, isLoading }
}
