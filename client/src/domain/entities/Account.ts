import type { AccountInfo, AccountType } from '../ports/AccountRepository';

export class Account implements AccountInfo {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: AccountType,
    public readonly currencyCode: string,
    public readonly linkedTo: string | null,
    public readonly createdBy: string,
    public readonly enabled: boolean,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isActive(): boolean {
    return this.enabled;
  }

  isLinked(): boolean {
    return this.linkedTo !== null;
  }

  static fromApiResponse(data: AccountInfo): Account {
    return new Account(
      data.id!,
      data.name,
      data.type,
      data.currencyCode,
      data.linkedTo || null,
      data.createdBy,
      data.enabled
    );
  }

  getDisplayName(): string {
    return `${this.name} (${this.currencyCode})`;
  }
}
