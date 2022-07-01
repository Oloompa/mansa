import { ClientError } from '../model/error/client_error';
import { ConflictError } from '../model/error/conflict_error';
import { Logger } from '../ports/library/logger';
import { UserRepository } from '../ports/repository/user_repository';
import { ValidationErrors } from '../model/error/validation_error';

const atLeastOneSymbol = /[^a-zA-Z0-9]/;
const atLeastOneSymbolOtherThanArobase = /[^a-zA-Z0-9@]/;
const noArobase = /(?!.*@)^/;
const twoArobaseOrMore = /@.*@/;

export class RegisterUseCase {
  constructor(private readonly logger: Logger, private readonly userRepository: UserRepository) {}

  async register(name: string, email: string, password: string): Promise<void> {
    try {
      const validationErrors = new ValidationErrors();

      if (atLeastOneSymbolOtherThanArobase.test(email)) {
        validationErrors.addError({
          label: 'email',
          description: 'Symbols are not allowed.',
        });
      }
      if (noArobase.test(email)) {
        validationErrors.addError({
          label: 'email',
          description: 'Missing arobase character.',
        });
      }
      if (twoArobaseOrMore.test(email)) {
        validationErrors.addError({
          label: 'email',
          description: 'Too much arobase character.',
        });
      }
      checkNoSymbol('name', name, validationErrors);
      checkNoSymbol('password', password, validationErrors);
      checkMinLength('name', name, 4, validationErrors);
      checkMinLength('password', password, 4, validationErrors);
      checkMaxLength('name', name, 50, validationErrors);
      checkMaxLength('email', email, 255, validationErrors);
      checkMaxLength('password', password, 50, validationErrors);
      if (validationErrors.isPopulated()) throw validationErrors;

      const nameExists = (await this.userRepository.read(name)) !== null;
      if (nameExists) throw new ConflictError('Username already exists.');
      const emailExists = (await this.userRepository.readByEmail(email)) !== null;
      if (emailExists) throw new ConflictError('Email already exists.');

      await this.userRepository.save({
        name,
        email,
        password,
      });
      this.logger.info(`User ${name} registered.`);
    } catch (exception) {
      if (exception instanceof ClientError === false) {
        if (exception instanceof Error) this.logger.error(exception.message, exception.stack);
        else {
          this.logger.error((exception as any).toString());
        }
      }
      throw exception;
    }
  }
}

function checkMinLength(label: string, value: string, minValue: number, validationErrors: ValidationErrors) {
  if (value.length < minValue) {
    validationErrors.addError({
      label,
      description: `Length must be equal or greater than ${minValue} characters.`,
    });
  }
}

function checkMaxLength(label: string, value: string, maxValue: number, validationErrors: ValidationErrors) {
  if (value.length > maxValue) {
    validationErrors.addError({
      label,
      description: `Length must be equal or lesser than ${maxValue} characters.`,
    });
  }
}

function checkNoSymbol(label: string, value: string, validationErrors: ValidationErrors) {
  if (atLeastOneSymbol.test(value)) {
    validationErrors.addError({
      label,
      description: 'Symbols are not allowed.',
    });
  }
}
