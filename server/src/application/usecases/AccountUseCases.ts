import type { AccountCreateData, AccountCreateInput, AccountRepository } from '../../domain/ports/AccountRepository';
import { Account } from '../../domain/entities/Account';
import { AuthorizationError, NotFoundError } from '../../domain/errors/DomainErrors';

export class AccountUseCases {
  constructor(private accountRepository: AccountRepository) {}

  async createAccount(accountCreateInput: AccountCreateInput, createdBy: string): Promise<Account> {
    const accountData = Account.create(accountCreateInput, createdBy) satisfies AccountCreateData;
    return await this.accountRepository.create(accountData);
  }

  async getEnabledAccountsByUser(userId: string): Promise<Account[]> {
    return await this.accountRepository.findByUserId(userId, true);
  }

  async getUserAccountById(userId: string, accountId: string): Promise<Account> {
    const account = (await this.accountRepository.findById(accountId)) satisfies Account | null;
    if (!account) {
      throw new NotFoundError('Account not found');
    }

    if (!account.canBeManagedBy(userId)) {
      throw new AuthorizationError('Access denied');
    }

    return account;
  }
}
