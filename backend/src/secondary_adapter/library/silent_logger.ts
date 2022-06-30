import { Logger } from '../../core/ports/library/logger';

export class SilentLogger implements Logger {
  constructor(readonly metadata: object) {}

  getChild(_metadata: object): Logger {
    return new SilentLogger({});
  }

  trace(_message: string): void {}
  debug(_message: string): void {}
  info(_message: string): void {}
  warn(_message: string): void {}
  error(_message: string, _stack?: string): void {}
  fatal(_message: string, _stack?: string): void {}
}
