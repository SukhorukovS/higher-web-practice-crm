export function pluralize(count: number, variants: [string, string, string]): string {
  const abs = Math.abs(Math.trunc(count))
  const mod10 = abs % 10
  const mod100 = abs % 100

  if (mod100 >= 11 && mod100 <= 19) {
    return variants[2]
  }

  if (mod10 === 1) {
    return variants[0]
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return variants[1]
  }

  return variants[2]
}
