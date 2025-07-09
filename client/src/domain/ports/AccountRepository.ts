import type { Account } from '../entities/Account';

export interface AccountRepository {
  getEnabledAccounts(): Promise<Account[]>;
  getNotLinkedAccounts(): Promise<Account[]>;
  createAccount(accountData: CreateAccountData): Promise<void>;
}

export interface CreateAccountData {
  name: string;
  type: AccountType;
  currencyCode: string;
}

export interface AccountsResponse {
  accounts: AccountInfo[];
}

export interface AccountInfo {
  id?: string;
  name: string;
  type: AccountType;
  currencyCode: string;
  linkedTo: string | null;
  createdBy: string;
  enabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AccountType = keyof typeof ACCOUNT_TYPES;

export enum ACCOUNT_TYPES {
  CHECKING = 'Checking',
  CREDIT_CARD = 'Credit card',
  DEBIT_CARD = 'Debit card',
  INVESTMENT = 'Investment',
  CREDIT = 'Credit',
}
