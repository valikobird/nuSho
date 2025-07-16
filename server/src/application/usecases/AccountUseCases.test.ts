import type { MockedFunction } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AccountUseCases } from './AccountUseCases';
import type { AccountCreateData, AccountCreateInput, AccountRepository } from '../../domain/ports/AccountRepository';
import { Account } from '../../domain/entities/Account';

describe('Account use cases', () => {
  let accountUseCases: AccountUseCases;
  let mockAccountRepository: {
    [K in keyof AccountRepository]: MockedFunction<AccountRepository[K]>;
  };

  beforeEach(() => {
    mockAccountRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findByUserId: vi.fn(),
    };

    accountUseCases = new AccountUseCases(mockAccountRepository);
  });

  describe('Create account', () => {
    it('should create not linked account successfully', async () => {
      const accountData = {
        name: '  New account  ',
        type: 'INVESTMENT' as const,
        currencyCode: 'CLP',
      } satisfies AccountCreateInput;

      const userId = '1';

      const mockPreparedAccountData = {
        name: 'New account',
        type: 'INVESTMENT',
        currencyCode: 'CLP',
        createdBy: '1',
        enabled: true,
      } satisfies AccountCreateData;

      const mockAccount = {
        id: '1',
        name: 'New account',
        type: 'INVESTMENT' as const,
        currencyCode: 'CLP',
        createdBy: userId,
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        canBeManagedBy: vi.fn(),
      } satisfies Account;

      const accountCreateSpy = vi.spyOn(Account, 'create');

      mockAccountRepository.create.mockResolvedValue(mockAccount);

      const result = await accountUseCases.createAccount(accountData, userId);

      expect(accountCreateSpy).toHaveBeenCalledWith(accountData, userId);

      expect(mockAccountRepository.create).toHaveBeenCalledWith(mockPreparedAccountData);

      expect(result).toEqual(mockAccount);

      accountCreateSpy.mockRestore();
    });
  });

  describe('Get all enabled accounts by user', () => {
    it('should return all enabled accounts for a specified user', async () => {
      const userId = '1';

      const mockAccounts = [
        {
          id: '1',
          name: 'Investment Account',
          type: 'INVESTMENT' as const,
          currencyCode: 'CLP',
          createdBy: userId,
          enabled: true,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
          canBeManagedBy: vi.fn(),
        },
        {
          id: '2',
          name: 'Savings Account',
          type: 'CHECKING' as const,
          currencyCode: 'USD',
          createdBy: userId,
          enabled: true,
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
          canBeManagedBy: vi.fn(),
        },
      ] satisfies Account[];

      mockAccountRepository.findByUserId.mockResolvedValue(mockAccounts);

      const result = await accountUseCases.getEnabledAccountsByUser(userId);

      expect(mockAccountRepository.findByUserId).toHaveBeenCalledWith(userId, true);
      expect(result).toEqual(mockAccounts);
    });
  });

  describe('Get user account', () => {
    it('should return specific account for a particular user', async () => {
      const userId = '1';
      const accountId = '2';

      const mockAccount = {
        id: '1',
        name: 'Investment Account',
        type: 'INVESTMENT' as const,
        currencyCode: 'CLP',
        createdBy: userId,
        enabled: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        canBeManagedBy: vi.fn(),
      };
      mockAccount.canBeManagedBy.mockResolvedValue(userId);
      mockAccountRepository.findById.mockResolvedValue(mockAccount);

      const result = await accountUseCases.getUserAccountById(userId, accountId);

      expect(mockAccountRepository.findById).toHaveBeenCalledWith(accountId);
      expect(result).toEqual(mockAccount);
    });

    it('should throw error if account not found', async () => {
      const userId = '1';
      const accountId = '2';

      mockAccountRepository.findByUserId.mockResolvedValue([]);

      await expect(accountUseCases.getUserAccountById(userId, accountId)).rejects.toThrow('Account not found');
    });

    it('should throw error if account cannot be managed by provided user', async () => {
      const userId = '1';
      const accountId = '2';
      const differentUserId = '3';

      const mockAccount = {
        id: '1',
        name: 'Investment Account',
        type: 'INVESTMENT' as const,
        currencyCode: 'CLP',
        createdBy: differentUserId,
        enabled: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        canBeManagedBy: vi.fn(),
      };

      mockAccount.canBeManagedBy.mockReturnValue(false);
      mockAccountRepository.findById.mockResolvedValue(mockAccount);

      await expect(accountUseCases.getUserAccountById(userId, accountId)).rejects.toThrow('Access denied');

      expect(mockAccountRepository.findById).toHaveBeenCalledWith(accountId);
      expect(mockAccount.canBeManagedBy).toHaveBeenCalledWith(userId);
    });
  });
});
