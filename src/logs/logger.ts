export function logInfo(message: string): void {
  console.log(`[DataBoard] ${new Date().toISOString()} ${message}`)
}

export function logError(message: string, error?: unknown): void {
  console.error(`[DataBoard] ${new Date().toISOString()} ${message}`, error)
}

export function logWarn(message: string): void {
  console.warn(`[DataBoard] ${new Date().toISOString()} ${message}`)
}
