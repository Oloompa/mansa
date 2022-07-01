import { ClientError } from './client_error';

type ValidationError = {
  label: string;
  description: string;
};

export class ValidationErrors extends ClientError {
  private details: ValidationError[] = [];

  constructor() {
    super('Validation failed.');
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, ValidationErrors.prototype);
  }

  addError(detail: ValidationError) {
    this.details.push(detail);
  }

  getErrors(): ValidationError[] {
    return this.details;
  }

  isPopulated(): boolean {
    return this.details.length > 0;
  }
}
