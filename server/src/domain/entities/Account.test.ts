import { describe, it, expect } from 'vitest';
import type { AccountCreateInput, AccountInfo, AccountType } from '../ports/AccountRepository';
import { ACCOUNT_TYPES } from '../ports/AccountRepository';
import { Account } from './Account';

describe('Account Entity', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-02'),
  };

  describe('constructor', () => {
    it('should create an Account instance with all properties', () => {
      const accountData = {
        id: '1',
        name: 'Checking Account',
        type: 'CHECKING' as const,
        currencyCode: 'USD',
        createdBy: mockUser,
        enabled: true,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-02'),
      } satisfies AccountInfo;

      const account = new Account(
        accountData.id,
        accountData.name,
        accountData.type,
        accountData.currencyCode,
        accountData.createdBy,
        accountData.enabled,
        accountData.createdAt,
        accountData.updatedAt
      );

      expect(account.id).toBe(accountData.id);
      expect(account.name).toBe(accountData.name);
      expect(account.type).toBe(accountData.type);
      expect(account.currencyCode).toBe(accountData.currencyCode);
      expect(account.createdBy).toBe(accountData.createdBy);
      expect(account.enabled).toBe(accountData.enabled);
      expect(account.createdAt).toBe(accountData.createdAt);
      expect(account.updatedAt).toBe(accountData.updatedAt);
      expect(account.linkedTo).not.toBeDefined();
    });

    it('should handle linkedTo property', () => {
      const linkedAccount = new Account(
        '2',
        'Savings Account',
        'CHECKING',
        'USD',
        mockUser,
        true,
        new Date(),
        new Date()
      );

      const account = new Account(
        '1',
        'Checking Account',
        'INVESTMENT',
        'USD',
        mockUser,
        true,
        new Date(),
        new Date(),
        linkedAccount
      );

      expect(account.linkedTo).toBe(linkedAccount);
    });
  });

  describe('canBeManagedBy', () => {
    it('should return true when user is the creator (object)', () => {
      const account = new Account('1', 'Test Account', 'CHECKING', 'USD', mockUser, true, new Date(), new Date());

      expect(account.canBeManagedBy(mockUser.id)).toBe(true);
    });

    it('should return false when user is not the creator (object)', () => {
      const account = new Account('1', 'Test Account', 'CHECKING', 'USD', mockUser, true, new Date(), new Date());

      expect(account.canBeManagedBy('different-user-id')).toBe(false);
    });

    it('should handle createdBy as string', () => {
      const account = new Account(
        '1',
        'Test Account',
        'CHECKING',
        'USD',
        'user-id-string',
        true,
        new Date(),
        new Date()
      );

      expect(account.canBeManagedBy('user-id-string')).toBe(true);
      expect(account.canBeManagedBy('different-user-id')).toBe(false);
    });

    it('should handle edge case with empty userId', () => {
      const account = new Account('1', 'Test Account', 'CHECKING', 'USD', mockUser, true, new Date(), new Date());

      expect(account.canBeManagedBy('')).toBe(false);
    });

    it('should handle whitespace-only userId', () => {
      const account = new Account('1', 'Test Account', 'CHECKING', 'USD', mockUser, true, new Date(), new Date());

      expect(account.canBeManagedBy('   ')).toBe(false);
      expect(account.canBeManagedBy('\t\n')).toBe(false);
    });

    it('should be case-sensitive for userId comparison', () => {
      const account = new Account('1', 'Test Account', 'CHECKING', 'USD', 'User123', true, new Date(), new Date());

      expect(account.canBeManagedBy('User123')).toBe(true);
      expect(account.canBeManagedBy('user123')).toBe(false);
      expect(account.canBeManagedBy('USER123')).toBe(false);
    });
  });

  describe('create', () => {
    it('should create account data object', () => {
      const accountCreateInput = {
        name: '  Test Account  ',
        type: 'CREDIT',
        currencyCode: 'EUR',
      } satisfies AccountCreateInput;
      const createdBy = 'user-123';

      const accountData = Account.create(accountCreateInput, createdBy);

      expect(accountData).toEqual({
        name: 'Test Account',
        type: accountCreateInput.type,
        currencyCode: accountCreateInput.currencyCode,
        createdBy,
        enabled: true,
      });
    });

    it('should trim whitespace from name', () => {
      const accountCreateInput = {
        name: '   My Account   ',
        type: 'CREDIT_CARD',
        currencyCode: 'USD',
      } satisfies AccountCreateInput;
      const createdBy = 'user-123';

      const accountData = Account.create(accountCreateInput, createdBy);

      expect(accountData.name).toBe('My Account');
    });

    it('should always set enabled to true', () => {
      const accountCreateInput = {
        name: 'Test Account',
        type: 'DEBIT_CARD',
        currencyCode: 'GBP',
      } satisfies AccountCreateInput;
      const createdBy = 'user-123';

      const accountData = Account.create(accountCreateInput, createdBy);

      expect(accountData.enabled).toBe(true);
    });

    it('should handle all account types', () => {
      const accountTypes: AccountType[] = Object.keys(ACCOUNT_TYPES) as AccountType[];
      const createdBy = 'user-123';

      accountTypes.forEach((type) => {
        const accountCreateInput = {
          name: `${type} Account`,
          type,
          currencyCode: 'USD',
        } satisfies AccountCreateInput;

        const accountData = Account.create(accountCreateInput, createdBy);

        expect(accountData.type).toBe(type);
        expect(accountData.name).toBe(`${type} Account`);
      });
    });
  });
});
