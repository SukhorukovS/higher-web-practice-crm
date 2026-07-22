export type PeriodFilter = 'week' | 'month' | 'quarter'

export function isWithinPeriod(dateStr: string, period: PeriodFilter): boolean {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)

  switch (period) {
    case 'week':
      return diffDays <= 7
    case 'month':
      return diffDays <= 30
    case 'quarter':
      return diffDays <= 90
    default:
      return true
  }
}
