import { Container } from '../../infrastructure/Container';
import type { UserUseCases } from '../../application/usecases/UserUseCases';
import type { AccountUseCases } from '../../application/usecases/AccountUseCases';

const container = Container.getInstance();

export const useUserUseCases = (): UserUseCases => {
  return container.getUserUseCases();
};

export const useAccountUseCases = (): AccountUseCases => {
  return container.getAccountUseCases();
};

export const useContainer = () => {
  return {
    userUseCases: container.getUserUseCases(),
    accountUseCases: container.getAccountUseCases(),
  };
};
