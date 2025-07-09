import type { AccountInfo } from './AccountRepository';
import type { UserInfo } from './UserRepository';

export interface AccountBalanceRepository {
  create(accountBalanceData: AccountBalanceCreateInput): Promise<void>;
}

export interface AccountBalanceInfo {
  id?: string;
  account: AccountInfo | string;
  date: Date;
  amount: number;
  createdBy: string | UserInfo;
  createdAt: Date;
}

export interface AccountBalanceCreateInput extends Omit<AccountBalanceInfo, 'id' | 'createdAt'> {}

export interface AccountBalanceCreateData extends AccountBalanceCreateInput {}
