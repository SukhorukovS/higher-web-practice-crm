import type { TaskStatus } from '@/types/task'

export const statusMap: Record<TaskStatus, string> = {
  in_progress: 'В работе',
  new: 'Новая',
  completed: 'Завершена',
}

export const statusBgMap: Record<string, string> = {
  new: 'bg-blue-100',
  in_progress: 'bg-white',
  completed: 'bg-green-100',
}

export const statusColorMap: Record<string, string> = {
  new: 'text-gray-800',
  in_progress: 'text-blue-500',
  completed: 'text-green-500',
}
