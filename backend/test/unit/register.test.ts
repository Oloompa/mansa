import { InMemoryUserRepository } from '../../src/secondary_adapter/repository/in_memory_user_repository';
import { RegisterUseCase } from '../../src/core/use_case/register';
import { SilentLogger } from '../../src/secondary_adapter/library/silent_logger';
import { ValidationErrors } from '../../src/core/model/error/validation_error';
import { test } from 'zora';

test(`my very first test`, async (assertion) => {
  const useCase = new RegisterUseCase(
    new SilentLogger({}),
    new InMemoryUserRepository(),
  );
  const result = await useCase.register('John', 'em@il', '1234');
  assertion.equals(result, undefined);
});

test(`should save user`, async (assertion) => {
  const userRepository = new InMemoryUserRepository();
  const useCase = new RegisterUseCase(new SilentLogger({}), userRepository);
  await useCase.register('John', 'em@il', '1234');
  assertion.deepEqual(userRepository.getAllUsers(), [
    { name: 'John', email: 'em@il', password: '1234' },
  ]);
});

test(`should get a validation error when name contains symbols`, async (assertion) => {
  const userRepository = new InMemoryUserRepository();
  const useCase = new RegisterUseCase(new SilentLogger({}), userRepository);

  try {
    await useCase.register('John*', 'em@il', '1234');
    assertion.fail('use case did not throw');
  } catch (exception) {
    assertion.truthy(
      exception instanceof ValidationErrors,
      'exception is not a ValidationErrors',
    );
    assertion.deepEqual((exception as ValidationErrors).getErrors(), [
      {
        label: 'name',
        description: 'Symbols are not allowed.',
      },
    ]);
  }
});

test(`should get a validation error when name length is lower than 4 characters`, async (assertion) => {
  const userRepository = new InMemoryUserRepository();
  const useCase = new RegisterUseCase(new SilentLogger({}), userRepository);

  try {
    await useCase.register('luc', 'em@il', '1234');
    assertion.fail('use case did not throw');
  } catch (exception) {
    assertion.truthy(
      exception instanceof ValidationErrors,
      'exception is not a ValidationErrors',
    );
    assertion.deepEqual((exception as ValidationErrors).getErrors(), [
      {
        label: 'name',
        description: 'Length must be equal or greater than 4 characters.',
      },
    ]);
  }
});

test(`should get a validation error when name length is greater than 50 characters`, async (assertion) => {
  const userRepository = new InMemoryUserRepository();
  const useCase = new RegisterUseCase(new SilentLogger({}), userRepository);

  try {
    await useCase.register(
      '123456789012345678901234567890123456789012345678901',
      'em@il',
      '1234',
    );
    assertion.fail('use case did not throw');
  } catch (exception) {
    assertion.truthy(
      exception instanceof ValidationErrors,
      'exception is not a ValidationErrors',
    );
    assertion.deepEqual((exception as ValidationErrors).getErrors(), [
      {
        label: 'name',
        description: 'Length must be equal or lesser than 50 characters.',
      },
    ]);
  }
});

test(`should get a validation error when email contains symbols`, async (assertion) => {
  const userRepository = new InMemoryUserRepository();
  const useCase = new RegisterUseCase(new SilentLogger({}), userRepository);

  try {
    await useCase.register('John', 'em@i|', '1234');
    assertion.fail('use case did not throw');
  } catch (exception) {
    assertion.truthy(
      exception instanceof ValidationErrors,
      'exception is not a ValidationErrors',
    );
    assertion.deepEqual((exception as ValidationErrors).getErrors(), [
      {
        label: 'email',
        description: 'Symbols are not allowed.',
      },
    ]);
  }
});

test(`should get a validation error when email contains no arobase character`, async (assertion) => {
  const userRepository = new InMemoryUserRepository();
  const useCase = new RegisterUseCase(new SilentLogger({}), userRepository);

  try {
    await useCase.register('John', 'email', '1234');
    assertion.fail('use case did not throw');
  } catch (exception) {
    assertion.truthy(
      exception instanceof ValidationErrors,
      'exception is not a ValidationErrors',
    );
    assertion.deepEqual((exception as ValidationErrors).getErrors(), [
      {
        label: 'email',
        description: 'Missing arobase character.',
      },
    ]);
  }
});

test(`should get a validation error when email does contains more than one arobase character`, async (assertion) => {
  const userRepository = new InMemoryUserRepository();
  const useCase = new RegisterUseCase(new SilentLogger({}), userRepository);

  try {
    await useCase.register('John', '@m@il', '1234');
    assertion.fail('use case did not throw');
  } catch (exception) {
    assertion.truthy(
      exception instanceof ValidationErrors,
      'exception is not a ValidationErrors',
    );
    assertion.deepEqual((exception as ValidationErrors).getErrors(), [
      {
        label: 'email',
        description: 'Too much arobase character.',
      },
    ]);
  }
});

test(`should get a validation error when email length is greater than 255 characters`, async (assertion) => {
  const userRepository = new InMemoryUserRepository();
  const useCase = new RegisterUseCase(new SilentLogger({}), userRepository);

  try {
    await useCase.register(
      'john',
      'em@il12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901',
      '1234',
    );
    assertion.fail('use case did not throw');
  } catch (exception) {
    assertion.truthy(
      exception instanceof ValidationErrors,
      'exception is not a ValidationErrors',
    );
    assertion.deepEqual((exception as ValidationErrors).getErrors(), [
      {
        label: 'email',
        description: 'Length must be equal or lesser than 255 characters.',
      },
    ]);
  }
});

test(`should get a validation error when password contains symbols`, async (assertion) => {
  const userRepository = new InMemoryUserRepository();
  const useCase = new RegisterUseCase(new SilentLogger({}), userRepository);

  try {
    await useCase.register('John', 'em@il', '12*34');
    assertion.fail('use case did not throw');
  } catch (exception) {
    assertion.truthy(
      exception instanceof ValidationErrors,
      'exception is not a ValidationErrors',
    );
    assertion.deepEqual((exception as ValidationErrors).getErrors(), [
      {
        label: 'password',
        description: 'Symbols are not allowed.',
      },
    ]);
  }
});

test(`should get a validation error when password length is lower than 4 characters`, async (assertion) => {
  const userRepository = new InMemoryUserRepository();
  const useCase = new RegisterUseCase(new SilentLogger({}), userRepository);

  try {
    await useCase.register('John', 'em@il', '123');
    assertion.fail('use case did not throw');
  } catch (exception) {
    assertion.truthy(
      exception instanceof ValidationErrors,
      'exception is not a ValidationErrors',
    );
    assertion.deepEqual((exception as ValidationErrors).getErrors(), [
      {
        label: 'password',
        description: 'Length must be equal or greater than 4 characters.',
      },
    ]);
  }
});

test(`should get a validation error when password length is greater than 50 characters`, async (assertion) => {
  const userRepository = new InMemoryUserRepository();
  const useCase = new RegisterUseCase(new SilentLogger({}), userRepository);

  try {
    await useCase.register(
      'John',
      'em@il',
      '123456789012345678901234567890123456789012345678901',
    );
    assertion.fail('use case did not throw');
  } catch (exception) {
    assertion.truthy(
      exception instanceof ValidationErrors,
      'exception is not a ValidationErrors',
    );
    assertion.deepEqual((exception as ValidationErrors).getErrors(), [
      {
        label: 'password',
        description: 'Length must be equal or lesser than 50 characters.',
      },
    ]);
  }
});

test(`should get multiple multiple errors when multiple rules failed`, async (assertion) => {
  const userRepository = new InMemoryUserRepository();
  const useCase = new RegisterUseCase(new SilentLogger({}), userRepository);

  try {
    await useCase.register('J*', 'em.il', '12*');
    assertion.fail('use case did not throw');
  } catch (exception) {
    assertion.truthy(
      exception instanceof ValidationErrors,
      'exception is not a ValidationErrors',
    );
    console.log((exception as ValidationErrors).getErrors());
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
