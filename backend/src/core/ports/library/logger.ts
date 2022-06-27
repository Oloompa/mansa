export interface Logger {
  readonly metadata: object;

  getChild(metadata: object): Logger;

  /** To know the path used by a call. */
  trace(message: string): void;

  /** Debug purpose informations. */
  debug(message: string): void;

  /** Notice about a new state of application. */
  info(message: string): void;

  /** Something unexpected happened that could have side effects. But we continue. */
  warn(message: string): void;

  /** Something is wrong or do not works. */
  error(message: string, stack?: string): void;

  /** Program is unstable or is unable to work. App will crash. */
  fatal(message: string, stack?: string): void;
}

export const LOG_LEVEL = {
  TRACE: 'TRACE',
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  FATAL: 'FATAL',
} as const;
export type LogLevel = typeof LOG_LEVEL[keyof typeof LOG_LEVEL];
