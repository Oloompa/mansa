import { ClientError } from './client_error';

export class ConflictError extends ClientError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
