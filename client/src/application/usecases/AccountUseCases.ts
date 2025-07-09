import type { AccountRepository, CreateAccountData } from '../../domain/ports/AccountRepository';
import type { NotificationService } from '../../domain/ports/NotificationService';
import type { Account } from '../../domain/entities/Account';
import { handleError } from '../utils';
import cc from 'currency-codes';

export class AccountUseCases {
  constructor(
    private accountRepository: AccountRepository,
    private notificationService: NotificationService
  ) {}

  async getEnabledAccounts(): Promise<Account[]> {
    try {
      return await this.accountRepository.getEnabledAccounts();
    } catch (error) {
      handleError(error, 'Failed to get accounts', this.notificationService);
      throw error;
    }
  }

  async getNotLinkedAccounts(): Promise<Account[]> {
    try {
      return await this.accountRepository.getNotLinkedAccounts();
    } catch (error) {
      handleError(error, 'Failed to get accounts', this.notificationService);
      throw error;
    }
  }

  async createAccount(accountData: CreateAccountData): Promise<void> {
    if (!accountData.name?.trim()) {
      throw new Error('Account name is required');
    }

    if (!accountData.type) {
      throw new Error('Account type is required');
    }

    if (!accountData.currencyCode) {
      throw new Error('Currency code is required');
    }

    if (!cc.code(accountData.currencyCode)) {
      throw new Error('Invalid currency code');
    }

    try {
      await this.accountRepository.createAccount(accountData);
      this.notificationService.showSuccess('Account created successfully');
    } catch (error) {
      handleError(error, 'Failed to create account', this.notificationService);
    }
  }
}
