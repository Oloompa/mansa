import { InMemoryUserRepository } from '../../src/secondary_adapter/repository/in_memory_user_repository';
import { LoginUseCase } from '../../src/core/use_case/login';
import { SilentLogger } from '../../src/secondary_adapter/library/silent_logger';
import { test } from 'zora';

test(`should return null when email is not found`, async (assertion) => {
  const { useCase } = init();
  const result = await useCase.login('em@il', '1234');
  assertion.equals(result, null);
});

test(`should return null when user password mismatch`, async (assertion) => {
  const { useCase, userRepository } = init();
  userRepository.feedWith([{ name: 'John', email: 'em@il', password: 'qwerty' }]);
  const result = await useCase.login('em@il', '1234');
  assertion.equals(result, null);
});

test(`should return username when user with same email and password is found`, async (assertion) => {
  const { useCase, userRepository } = init();
  userRepository.feedWith([{ name: 'John', email: 'em@il', password: '1234' }]);
  const result = await useCase.login('em@il', '1234');
  assertion.equals(result, 'John');
});

function init() {
  const userRepository = new InMemoryUserRepository();
  const useCase = new LoginUseCase(new SilentLogger({}), userRepository);
  return { userRepository, useCase };
}
