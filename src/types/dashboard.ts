import type { Client } from '@/types/client'
import type { Deal } from '@/types/deal'
import type { Task } from '@/types/task'

export type DashboardStats = {
  clients: {
    total: number
    today: number
    week: number
    month: number
    quarter: number
  }

  activeDeals: {
    total: number
    today: number
    week: number
    month: number
  }

  completedDeals: {
    total: number
    today: number
    week: number
    month: number
  }
}

export type DashboardData = {
  stats: DashboardStats

  topClients: Client[]

  recentDeals: Deal[]

  recentTasks: Task[]
}
