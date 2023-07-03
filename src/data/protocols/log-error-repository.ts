export interface LogErrorRepository {
  logError: (stacK: string) => Promise<void>
}
