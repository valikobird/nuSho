import type { AccountRepository, CreateAccountData, AccountsResponse } from '../../domain/ports/AccountRepository';
import { HttpClient } from './HttpClient';
import { Account } from '../../domain/entities/Account';
import type { GeneralApiResponse } from '../types';

export class ApiAccountRepository implements AccountRepository {
  private httpClient = new HttpClient();

  async getEnabledAccounts(): Promise<Account[]> {
    const response = await this.httpClient.get<AccountsResponse>('/accounts');
    return response.accounts.map(Account.fromApiResponse);
  }

  async getNotLinkedAccounts(): Promise<Account[]> {
    const response = await this.httpClient.get<AccountsResponse>('/accounts/not-linked');
    return response.accounts.map(Account.fromApiResponse);
  }

  async createAccount(accountData: CreateAccountData): Promise<void> {
    await this.httpClient.post<GeneralApiResponse>('/accounts', accountData);
  }
}
