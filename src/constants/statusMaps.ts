import type { DealStatus } from '@/types/deal'

export const statusMap: Record<DealStatus, string> = {
  in_progress: 'В работе',
  new: 'Новая',
  completed: 'Завершена',
  cancelled: 'Отменена',
}

export const statusBgMap: Record<string, string> = {
  new: 'bg-blue-100',
  in_progress: 'bg-white',
  completed: 'bg-green-100',
  cancelled: 'bg-yellow-100',
}

export const statusColorMap: Record<string, string> = {
  new: 'text-gray-800',
  in_progress: 'text-blue-500',
  completed: 'text-green-500',
  cancelled: 'text-yellow-500',
}
