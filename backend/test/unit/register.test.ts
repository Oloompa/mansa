import { IAssert, test } from 'zora';

import { ConflictError } from '../../src/core/model/error/conflict_error';
import { InMemoryUserRepository } from '../../src/secondary_adapter/repository/in_memory_user_repository';
import { RegisterUseCase } from '../../src/core/use_case/register';
import { SilentLogger } from '../../src/secondary_adapter/library/silent_logger';
import { ValidationErrors } from '../../src/core/model/error/validation_error';

test(`my very first test`, async (assertion) => {
  const { useCase } = init();
  const result = await useCase.register('John', 'em@il', '1234');
  assertion.equals(result, undefined);
});

test(`should save user`, async (assertion) => {
  const { userRepository, useCase } = init();
  await useCase.register('John', 'em@il', '1234');
  assertion.deepEqual(userRepository.getAllUsers(), [{ name: 'John', email: 'em@il', password: '1234' }]);
});

test(`should get a validation error when name contains symbols`, async (assertion) => {
  const { useCase } = init();

  try {
    await useCase.register('John*', 'em@il', '1234');
    assertion.fail('use case did not throw');
  } catch (exception) {
    checkIsValidationError(exception, assertion, 'name', 'Symbols are not allowed.');
  }
});

test(`should get a validation error when name length is lower than 4 characters`, async (assertion) => {
  const { userRepository, useCase } = init();

  try {
    await useCase.register('luc', 'em@il', '1234');
    assertion.fail('use case did not throw');
  } catch (exception) {
    checkIsValidationError(exception, assertion, 'name', 'Length must be equal or greater than 4 characters.');
  }
});

test(`should get a validation error when name length is greater than 50 characters`, async (assertion) => {
  const { useCase } = init();

  try {
    await useCase.register('123456789012345678901234567890123456789012345678901', 'em@il', '1234');
    assertion.fail('use case did not throw');
  } catch (exception) {
    checkIsValidationError(exception, assertion, 'name', 'Length must be equal or lesser than 50 characters.');
  }
});

test(`should get a validation error when email contains symbols`, async (assertion) => {
  const { useCase } = init();

  try {
    await useCase.register('John', 'em@i|', '1234');
    assertion.fail('use case did not throw');
  } catch (exception) {
    checkIsValidationError(exception, assertion, 'email', 'Symbols are not allowed.');
  }
});

test(`should get a validation error when email contains no arobase character`, async (assertion) => {
  const { useCase } = init();

  try {
    await useCase.register('John', 'email', '1234');
    assertion.fail('use case did not throw');
  } catch (exception) {
    checkIsValidationError(exception, assertion, 'email', 'Missing arobase character.');
  }
});

test(`should get a validation error when email does contains more than one arobase character`, async (assertion) => {
  const { useCase } = init();

  try {
    await useCase.register('John', '@m@il', '1234');
    assertion.fail('use case did not throw');
  } catch (exception) {
    checkIsValidationError(exception, assertion, 'email', 'Too much arobase character.');
  }
});

test(`should get a validation error when email length is greater than 255 characters`, async (assertion) => {
  const { useCase } = init();

  try {
    await useCase.register(
      'John',
      'em@il12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901',
      '1234',
    );
    assertion.fail('use case did not throw');
  } catch (exception) {
    checkIsValidationError(exception, assertion, 'email', 'Length must be equal or lesser than 255 characters.');
  }
});

test(`should get a validation error when password contains symbols`, async (assertion) => {
  const { useCase } = init();

  try {
    await useCase.register('John', 'em@il', '12*34');
    assertion.fail('use case did not throw');
  } catch (exception) {
    checkIsValidationError(exception, assertion, 'password', 'Symbols are not allowed.');
  }
});

test(`should get a validation error when password length is lower than 4 characters`, async (assertion) => {
  const { useCase } = init();

  try {
    await useCase.register('John', 'em@il', '123');
    assertion.fail('use case did not throw');
  } catch (exception) {
    checkIsValidationError(exception, assertion, 'password', 'Length must be equal or greater than 4 characters.');
  }
});

test(`should get a validation error when password length is greater than 50 characters`, async (assertion) => {
  const { useCase } = init();

  try {
    await useCase.register('John', 'em@il', '123456789012345678901234567890123456789012345678901');
    assertion.fail('use case did not throw');
  } catch (exception) {
    checkIsValidationError(exception, assertion, 'password', 'Length must be equal or lesser than 50 characters.');
  }
});

test(`should get multiple errors when multiple rules failed`, async (assertion) => {
  const { useCase } = init();

  try {
    await useCase.register('J*', 'em.il', '12*');
    assertion.fail('use case did not throw');
  } catch (exception) {
    assertion.truthy(exception instanceof ValidationErrors, 'exception is not a ValidationErrors');
    assertion.deepEqual((exception as ValidationErrors).getErrors(), [
      {
        label: 'email',
        description: 'Symbols are not allowed.',
      },
      {
        label: 'email',
        description: 'Missing arobase character.',
      },
      {
        label: 'name',
        description: 'Symbols are not allowed.',
      },
      {
        label: 'password',
        description: 'Symbols are not allowed.',
      },
      {
        label: 'name',
        description: 'Length must be equal or greater than 4 characters.',
      },
      {
        label: 'password',
        description: 'Length must be equal or greater than 4 characters.',
      },
    ]);
  }
});

test(`should get a conflict error when name already exists`, async (assertion) => {
  const { userRepository, useCase } = init();
  userRepository.feedWith([
    {
      name: 'famousName',
      email: 'famous@email',
      password: '1234',
    },
  ]);

  try {
    await useCase.register('famousName', 'em@il', '1234');
    assertion.fail('use case did not throw');
  } catch (exception) {
    assertion.truthy(exception instanceof ConflictError, 'exception is not a ConflictError');
    assertion.equal((exception as ConflictError).message, 'Username already exists.');
  }
});

test(`should get a conflict error when email already exists`, async (assertion) => {
  const { userRepository, useCase } = init();
  userRepository.feedWith([
    {
      name: 'famousName',
      email: 'famous@email',
      password: '1234',
    },
  ]);

  try {
    await useCase.register('John', 'famous@email', '1234');
    assertion.fail('use case did not throw');
  } catch (exception) {
    assertion.truthy(exception instanceof ConflictError, 'exception is not a ConflictError');
    assertion.equal((exception as ConflictError).message, 'Email already exists.');
  }
});

function init() {
  const userRepository = new InMemoryUserRepository();
  const useCase = new RegisterUseCase(new SilentLogger({}), userRepository);
  return { userRepository, useCase };
}

function checkIsValidationError(exception: unknown, assertion: IAssert, label: string, description: string) {
  assertion.truthy(exception instanceof ValidationErrors, 'exception is not a ValidationErrors');
  assertion.deepEqual((exception as ValidationErrors).getErrors(), [
    {
      label,
      description,
    },
  ]);
}
