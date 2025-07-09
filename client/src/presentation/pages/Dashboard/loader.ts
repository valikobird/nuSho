import type { Container } from '../../../infrastructure/Container';
import type { Account } from '../../../domain/entities/Account';

const loader = (container: Container) => {
  const accountUseCases = container.getAccountUseCases();

  return async (): Promise<Account[]> => {
    try {
      return await accountUseCases.getEnabledAccounts();
    } catch {
      return [];
    }
  };
};

export default loader;
