import type { AccountBalanceCreateData, AccountBalanceRepository } from '../../domain/ports/AccountBalanceRepository';
import type { AccountUseCases } from './AccountUseCases';

export class AccountBalanceUseCases {
  constructor(
    private accountBalanceRepository: AccountBalanceRepository,
    private accountUseCases: AccountUseCases
  ) {}

  async createAccountBalance(accountBalanceData: AccountBalanceCreateData): Promise<void> {
    const userId =
      typeof accountBalanceData.createdBy === 'string'
        ? accountBalanceData.createdBy
        : accountBalanceData.createdBy.id!;

    const accountId =
      typeof accountBalanceData.account === 'string' ? accountBalanceData.account : accountBalanceData.account.id!;

    // Validate that the account exists and the user can access it
    await this.accountUseCases.getUserAccountById(userId, accountId);

    await this.accountBalanceRepository.create(accountBalanceData);
  }
}
