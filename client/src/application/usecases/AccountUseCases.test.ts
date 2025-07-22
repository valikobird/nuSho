import type { MockedFunction } from 'vitest';
import { beforeEach, expect, describe, it, vi } from 'vitest';
import type { AccountRepository, CreateAccountData } from '../../domain/ports/AccountRepository';
import type { Account } from '../../domain/entities/Account';
import type { NotificationService } from '../../domain/ports/NotificationService';
import { AccountUseCases } from './AccountUseCases';

describe('Account Use Cases', () => {
  let accountUseCases: AccountUseCases;
  let mockAccountRepository: {
    [K in keyof AccountRepository]: MockedFunction<AccountRepository[K]>;
  };
  let mockNotificationService: {
    [K in keyof NotificationService]: MockedFunction<NotificationService[K]>;
  };

  beforeEach(() => {
    mockAccountRepository = {
      createAccount: vi.fn(),
      getEnabledAccounts: vi.fn(),
      getNotLinkedAccounts: vi.fn(),
    };

    mockNotificationService = {
      showSuccess: vi.fn(),
      showError: vi.fn(),
    };

    accountUseCases = new AccountUseCases(mockAccountRepository, mockNotificationService);
  });

  describe('Create Unlinked Account', () => {
    it('should validate account name is provided', async () => {
      const accountData = {
        type: 'INVESTMENT',
        currencyCode: 'CLP',
      } as unknown as CreateAccountData;
      const errorMsg = 'Account name is required';
      const error = new Error(errorMsg);

      await expect(accountUseCases.createAccount(accountData)).rejects.toThrow(error);
      expect(mockAccountRepository.createAccount).not.toHaveBeenCalled();
    });

    it('should validate account type is provided', async () => {
      const accountData = {
        name: 'New account',
        currencyCode: 'CLP',
      } as unknown as CreateAccountData;
      const errorMsg = 'Account type is required';
      const error = new Error(errorMsg);

      await expect(accountUseCases.createAccount(accountData)).rejects.toThrow(error);
      expect(mockAccountRepository.createAccount).not.toHaveBeenCalled();
    });

    it('should validate currency code is provided', async () => {
      const accountData = {
        name: 'New account',
        type: 'INVESTMENT',
      } as unknown as CreateAccountData;
      const errorMsg = 'Currency code is required';
      const error = new Error(errorMsg);

      await expect(accountUseCases.createAccount(accountData)).rejects.toThrow(error);
      expect(mockAccountRepository.createAccount).not.toHaveBeenCalled();
    });

    it('should check if valid currency code is provided', async () => {
      const accountData = {
        name: 'New account',
        type: 'INVESTMENT',
        currencyCode: '?',
      } as unknown as CreateAccountData;
      const errorMsg = 'Invalid currency code';
      const error = new Error(errorMsg);

      await expect(accountUseCases.createAccount(accountData)).rejects.toThrow(error);
      expect(mockAccountRepository.createAccount).not.toHaveBeenCalled();
    });

    it('should create not linked account successfully', async () => {
      const accountData = {
        name: 'New account',
        type: 'INVESTMENT',
        currencyCode: 'CLP',
      } satisfies CreateAccountData;

      await accountUseCases.createAccount(accountData);

      expect(mockAccountRepository.createAccount).toHaveBeenCalledWith(accountData);
      expect(mockNotificationService.showSuccess).toHaveBeenCalledWith('Account created successfully');
    });

    it('should hancle not linked account creation failure', async () => {
      const accountData = {
        name: 'New account',
        type: 'INVESTMENT',
        currencyCode: 'CLP',
      } satisfies CreateAccountData;
      const errorMsg = 'Failed to create account';
      const error = new Error(errorMsg);

      mockAccountRepository.createAccount.mockRejectedValue(error);

      await expect(accountUseCases.createAccount(accountData)).rejects.toThrow(error);

      expect(mockAccountRepository.createAccount).toHaveBeenCalledWith(accountData);
      expect(mockNotificationService.showError).toHaveBeenCalledWith(errorMsg);
    });
  });

  describe('Get User Enabled Accounts', () => {
    it('should get user enabled accounts successfully', async () => {
      const userId = '1';
      const mockAccounts = [
        {
          id: '1',
          name: 'Investment Account',
          type: 'INVESTMENT' as const,
          currencyCode: 'CLP',
          linkedTo: null,
          createdBy: userId,
          enabled: true,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
          isActive: vi.fn(),
          isLinked: vi.fn(),
          getDisplayName: vi.fn(),
        },
        {
          id: '2',
          name: 'Savings Account',
          type: 'CHECKING' as const,
          currencyCode: 'USD',
          linkedTo: null,
          createdBy: userId,
          enabled: true,
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
          isActive: vi.fn(),
          isLinked: vi.fn(),
          getDisplayName: vi.fn(),
        },
      ] satisfies Account[];

      mockAccountRepository.getEnabledAccounts.mockResolvedValue(mockAccounts);

      const result = await accountUseCases.getEnabledAccounts();

      expect(result).toHaveLength(2);
      expect(result).toEqual(mockAccounts);
    });

    it('should handle get accounts failure', async () => {
      const errorMsg = 'Failed to get accounts';
      const error = new Error(errorMsg);

      mockAccountRepository.getEnabledAccounts.mockRejectedValue(error);

      await expect(accountUseCases.getEnabledAccounts()).rejects.toThrow(error);
      expect(mockNotificationService.showError).toHaveBeenCalledWith(errorMsg);
    });
  });

  describe('Get User Not Linked Accounts', () => {
    it('should get user not linked accounts successfully', async () => {
      const userId = '1';
      const mockAccounts = [
        {
          id: '1',
          name: 'Investment Account',
          type: 'INVESTMENT' as const,
          currencyCode: 'CLP',
          linkedTo: null,
          createdBy: userId,
          enabled: true,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
          isActive: vi.fn(),
          isLinked: vi.fn(),
          getDisplayName: vi.fn(),
        },
        {
          id: '2',
          name: 'Savings Account',
          type: 'CHECKING' as const,
          currencyCode: 'USD',
          linkedTo: null,
          createdBy: userId,
          enabled: true,
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
          isActive: vi.fn(),
          isLinked: vi.fn(),
          getDisplayName: vi.fn(),
        },
      ] satisfies Account[];

      mockAccountRepository.getNotLinkedAccounts.mockResolvedValue(mockAccounts);

      const result = await accountUseCases.getNotLinkedAccounts();

      expect(result).toHaveLength(2);
      expect(result).toEqual(mockAccounts);
    });

    it('should handle get not linked accounts failure', async () => {
      const errorMsg = 'Failed to get accounts';
      const error = new Error(errorMsg);

      mockAccountRepository.getNotLinkedAccounts.mockRejectedValue(error);

      await expect(accountUseCases.getNotLinkedAccounts()).rejects.toThrow(error);
      expect(mockNotificationService.showError).toHaveBeenCalledWith(errorMsg);
    });
  });
});
