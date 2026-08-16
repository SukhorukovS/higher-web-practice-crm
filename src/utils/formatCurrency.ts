export const formatCurrency = (amount: number): string =>
  amount.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 })
