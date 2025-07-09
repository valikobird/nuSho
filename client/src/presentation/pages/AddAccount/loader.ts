import type { Container } from '../../../infrastructure/Container';
import cc from 'currency-codes';
import { ACCOUNT_TYPES } from '../../../domain/ports/AccountRepository';

const loader = (container: Container) => {
  const accountUseCases = container.getAccountUseCases();

  return async () => {
    const accountTypes: string[][] = Object.entries(ACCOUNT_TYPES);
    const currencies: string[][] = cc.data.map(({ code, currency }) => [code, `${code} - ${currency}`]);

    let accounts: [string | null, string][];
    try {
      const notLinkedAccounts = await accountUseCases.getNotLinkedAccounts();
      accounts = notLinkedAccounts.map((account) => [account.id, account.getDisplayName()]);

      accounts.unshift([null, '']);
    } catch {
      accounts = [];
    }

    return { accounts, accountTypes, currencies };
  };
};

export default loader;
