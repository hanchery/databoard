export function formatNumber(n: number): string {
  if (n >= 10000) {
    return (n / 10000).toFixed(1) + 'w'
  }
  return n.toLocaleString()
}

export function formatPercent(n: number): string {
  return n.toFixed(0) + '%'
}

export function padZero(n: number): string {
  return n.toString().padStart(2, '0')
}
