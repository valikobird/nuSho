import type {
  AccountBalanceCreateData,
  AccountBalanceCreateInput,
  AccountBalanceInfo,
} from '../ports/AccountBalanceRepository';
import type { AccountInfo } from '../ports/AccountRepository';
import type { UserInfo } from '../ports/UserRepository';

export class AccountBalance implements AccountBalanceInfo {
  constructor(
    public readonly id: string | undefined,
    public readonly account: string | AccountInfo,
    public readonly date: Date,
    public readonly amount: number,
    public readonly createdBy: string | UserInfo,
    public readonly createdAt: Date
  ) {}

  static create(accountBalanceCreateInput: AccountBalanceCreateInput) {
    const { account, date, amount, createdBy } = accountBalanceCreateInput;
    return { account, date, amount, createdBy } satisfies AccountBalanceCreateData;
  }
}
