import type { AccountCreateData, AccountCreateInput, AccountInfo } from '../ports/AccountRepository';
import { type AccountType } from '../ports/AccountRepository';
import type { UserInfoNoPassword } from '../ports/UserRepository';

export class Account implements AccountInfo {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: AccountType,
    public readonly currencyCode: string,
    public readonly createdBy: UserInfoNoPassword | string,
    public readonly enabled: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly linkedTo?: AccountInfo | string
  ) {}

  canBeManagedBy(userId: string): boolean {
    if (typeof this.createdBy === 'string') {
      return this.createdBy === userId;
    }

    return this.createdBy.id === userId;
  }

  static create(accountCreateInput: AccountCreateInput, createdBy: string): AccountCreateData {
    const { name, type, currencyCode } = accountCreateInput;
    return { name: name.trim(), type, currencyCode, createdBy, enabled: true };
  }
}
