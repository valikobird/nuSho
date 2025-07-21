import type { AccountInfo } from './AccountRepository';
import type { UserInfoNoPassword } from './UserRepository';

export interface AccountBalanceRepository {
  create(accountBalanceData: AccountBalanceCreateInput): Promise<void>;
}

export interface AccountBalanceInfo {
  id?: string;
  account: AccountInfo | string;
  date: Date;
  amount: number;
  createdBy: string | UserInfoNoPassword;
  createdAt: Date;
}

export type AccountBalanceCreateInput = Omit<AccountBalanceInfo, 'id' | 'createdAt'>;

export type AccountBalanceCreateData = AccountBalanceCreateInput;
