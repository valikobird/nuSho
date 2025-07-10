import type { UserInfoNoPassword } from './UserRepository';
import type { Account } from '../entities/Account';

export interface AccountRepository {
  findById(id: string): Promise<Account | null>;
  findByUserId(userId: string, isEnabled?: boolean): Promise<Account[]>;
  create(accountData: AccountCreateData): Promise<Account>;
}

export interface AccountInfo {
  id?: string;
  name: string;
  type: AccountType;
  currencyCode: string;
  linkedTo?: AccountInfo | string;
  createdBy: UserInfoNoPassword | string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type AccountType = keyof typeof ACCOUNT_TYPES;

export enum ACCOUNT_TYPES {
  CHECKING = 'Checking',
  CREDIT_CARD = 'Credit card',
  DEBIT_CARD = 'Debit card',
  INVESTMENT = 'Investment',
  CREDIT = 'Credit',
}

export type AccountCreateInput = Omit<
  AccountInfo,
  'id' | 'linkedTo' | 'createdBy' | 'enabled' | 'createdAt' | 'updatedAt'
>;

export type AccountCreateData = Omit<AccountInfo, 'id' | 'createdAt' | 'updatedAt' | 'linkedTo'>;
