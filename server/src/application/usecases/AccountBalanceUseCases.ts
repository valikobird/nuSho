import { AccountBalanceCreateData, AccountBalanceRepository } from '../../domain/ports/AccountBalanceRepository';
import { AccountUseCases } from './AccountUseCases';

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

    await this.accountUseCases.getUserAccountById(userId, accountId);
    await this.accountBalanceRepository.create(accountBalanceData);
  }
}
