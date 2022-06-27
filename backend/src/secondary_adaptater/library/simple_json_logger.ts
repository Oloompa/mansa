import { LOG_LEVEL, LogLevel, Logger } from '../../core/ports/library/logger';

import mergeDeep from 'merge-deep';

export class SimpleJsonLogger implements Logger {
  constructor(readonly metadata: object) {}

  getChild(metadata: object): Logger {
    return new SimpleJsonLogger(mergeDeep(this.metadata, metadata));
  }

  trace(message: string): void {
    console.log(this.format(LOG_LEVEL.TRACE, message));
  }
  debug(message: string): void {
    console.log(this.format(LOG_LEVEL.DEBUG, message));
  }
  info(message: string): void {
    console.log(this.format(LOG_LEVEL.INFO, message));
  }
  warn(message: string): void {
    console.log(this.format(LOG_LEVEL.WARN, message));
  }
  error(message: string, stack?: string): void {
    console.log(this.format(LOG_LEVEL.ERROR, message, stack));
  }
  fatal(message: string, stack?: string): void {
    console.log(this.format(LOG_LEVEL.FATAL, message, stack));
  }

  private format(level: LogLevel, message: string, stack?: string): string {
    return JSON.stringify({
      dateTime: new Date().toISOString(),
      level,
      message,
      metadata: this.metadata,
      stack,
    });
  }
}
