import type { MockedFunction } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AccountBalanceUseCases } from './AccountBalanceUseCases';
import type { AccountUseCases } from './AccountUseCases';
import type { AccountBalanceRepository, AccountBalanceCreateData } from '../../domain/ports/AccountBalanceRepository';
import { Account } from '../../domain/entities/Account';
import { NotFoundError, AuthorizationError } from '../../domain/errors/DomainErrors';

describe('Account balance use cases', () => {
  let accountBalanceUseCases: AccountBalanceUseCases;
  let mockAccountBalanceRepository: {
    [K in keyof AccountBalanceRepository]: MockedFunction<AccountBalanceRepository[K]>;
  };
  let mockAccountUseCases: {
    [K in keyof AccountUseCases]: MockedFunction<AccountUseCases[K]>;
  };

  beforeEach(() => {
    mockAccountBalanceRepository = {
      create: vi.fn(),
    };

    mockAccountUseCases = {
      getUserAccountById: vi.fn(),
      createAccount: vi.fn(),
      getEnabledAccountsByUser: vi.fn(),
    };

    accountBalanceUseCases = new AccountBalanceUseCases(
      mockAccountBalanceRepository,
      mockAccountUseCases as unknown as AccountUseCases
    );
  });

  describe('Create account balance', () => {
    it('should create account balance successfully with string account and createdBy', async () => {
      const accountBalanceData: AccountBalanceCreateData = {
        account: 'account-1',
        date: new Date('2024-01-01'),
        amount: 1000,
        createdBy: 'user-1',
      };

      const mockAccount = new Account(
        'account-1',
        'Test Account',
        'CHECKING',
        'USD',
        'user-1',
        true,
        new Date(),
        new Date()
      );

      mockAccountUseCases.getUserAccountById.mockResolvedValue(mockAccount);
      mockAccountBalanceRepository.create.mockResolvedValue();

      await accountBalanceUseCases.createAccountBalance(accountBalanceData);

      expect(mockAccountUseCases.getUserAccountById).toHaveBeenCalledWith('user-1', 'account-1');
      expect(mockAccountBalanceRepository.create).toHaveBeenCalledWith(accountBalanceData);
    });

    it('should create account balance successfully with object account and createdBy', async () => {
      const mockAccount = new Account(
        'account-1',
        'Test Account',
        'CHECKING',
        'USD',
        'user-1',
        true,
        new Date(),
        new Date()
      );

      const accountBalanceData = {
        account: { id: 'account-1' } as any,
        date: new Date('2024-01-01'),
        amount: 1500,
        createdBy: { id: 'user-1' } as any,
      } satisfies AccountBalanceCreateData;

      mockAccountUseCases.getUserAccountById.mockResolvedValue(mockAccount);
      mockAccountBalanceRepository.create.mockResolvedValue();

      await accountBalanceUseCases.createAccountBalance(accountBalanceData);

      expect(mockAccountUseCases.getUserAccountById).toHaveBeenCalledWith('user-1', 'account-1');
      expect(mockAccountBalanceRepository.create).toHaveBeenCalledWith(accountBalanceData);
    });

    it('should throw NotFoundError if account does not exist', async () => {
      const accountBalanceData: AccountBalanceCreateData = {
        account: 'invalid-account',
        date: new Date('2024-01-01'),
        amount: 1000,
        createdBy: 'user-1',
      };

      mockAccountUseCases.getUserAccountById.mockRejectedValue(new NotFoundError('Account not found'));

      await expect(accountBalanceUseCases.createAccountBalance(accountBalanceData)).rejects.toThrow(
        'Account not found'
      );

      expect(mockAccountUseCases.getUserAccountById).toHaveBeenCalledWith('user-1', 'invalid-account');
      expect(mockAccountBalanceRepository.create).not.toHaveBeenCalled();
    });

    it('should throw AuthorizationError if user cannot manage the account', async () => {
      const accountBalanceData = {
        account: 'account-1',
        date: new Date('2024-01-01'),
        amount: 1000,
        createdBy: 'user-1',
      } satisfies AccountBalanceCreateData;

      mockAccountUseCases.getUserAccountById.mockRejectedValue(new AuthorizationError('Access denied'));

      await expect(accountBalanceUseCases.createAccountBalance(accountBalanceData)).rejects.toThrow('Access denied');

      expect(mockAccountUseCases.getUserAccountById).toHaveBeenCalledWith('user-1', 'account-1');
      expect(mockAccountBalanceRepository.create).not.toHaveBeenCalled();
    });
  });
});
