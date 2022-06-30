import { Logger } from '../ports/library/logger';
import { UserRepository } from '../ports/repository/user_repository';
import { ValidationErrors } from '../model/error/validation_error';

const atLeastOneSymbol = /[^a-zA-Z0-9]/;
const atLeastOneSymbolOtherThanArobase = /[^a-zA-Z0-9@]/;
const noArobase = /(?!.*@)^/;
const twoArobaseOrMore = /@.*@/;

export class RegisterUseCase {
  constructor(
    private readonly logger: Logger,
    private readonly userRepository: UserRepository,
  ) {}

  register(name: string, email: string, password: string): Promise<void> {
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
    return this.userRepository.save({
      name,
      email,
      password,
    });
  }
}

function checkMinLength(
  label: string,
  value: string,
  minValue: number,
  validationErrors: ValidationErrors,
) {
  if (value.length < minValue) {
    validationErrors.addError({
      label,
      description: `Length must be equal or greater than ${minValue} characters.`,
    });
  }
}

function checkMaxLength(
  label: string,
  value: string,
  maxValue: number,
  validationErrors: ValidationErrors,
) {
  if (value.length > maxValue) {
    validationErrors.addError({
      label,
      description: `Length must be equal or lesser than ${maxValue} characters.`,
    });
  }
}

function checkNoSymbol(
  label: string,
  value: string,
  validationErrors: ValidationErrors,
) {
  if (atLeastOneSymbol.test(value)) {
    validationErrors.addError({
      label,
      description: 'Symbols are not allowed.',
    });
  }
}
