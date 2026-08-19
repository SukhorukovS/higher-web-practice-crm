export const formatCurrency = (amount: number | null | undefined): string => {
  const value = !amount || Number.isNaN(amount) ? 0 : amount
  return value.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  })
}
