import { describe, expect, it } from 'vitest';
import type { AccountBalanceCreateInput, AccountBalanceInfo } from '../ports/AccountBalanceRepository';
import { AccountBalance } from './AccountBalance';

describe('Account Balance Entity', () => {
  describe('constructor', () => {
    it('should create an Account Balance instance with all properties', () => {
      const accountBalanceData = {
        id: '1',
        account: 'account-1',
        date: new Date('2023-01-02'),
        amount: 123,
        createdBy: 'user-1',
        createdAt: new Date(),
      } satisfies AccountBalanceInfo;

      const accountBalance = new AccountBalance(
        accountBalanceData.id,
        accountBalanceData.account,
        accountBalanceData.date,
        accountBalanceData.amount,
        accountBalanceData.createdBy,
        accountBalanceData.createdAt
      );

      expect(accountBalance.id).toBe(accountBalanceData.id);
      expect(accountBalance.account).to.equal(accountBalanceData.account);
      expect(accountBalance.date).to.equal(accountBalanceData.date);
      expect(accountBalance.amount).to.equal(accountBalanceData.amount);
      expect(accountBalance.createdBy).to.equal(accountBalanceData.createdBy);
      expect(accountBalance.createdAt).to.equal(accountBalanceData.createdAt);
    });
  });

  describe('create', () => {
    it('should create account balance data object', () => {
      const accountBalanceCreateInput = {
        account: 'account-1',
        date: new Date('2023-01-02'),
        amount: 123,
        createdBy: 'user-1',
      } satisfies AccountBalanceCreateInput;

      const accountBalance = AccountBalance.create(accountBalanceCreateInput);

      expect(accountBalance).toEqual({
        account: accountBalanceCreateInput.account,
        date: accountBalanceCreateInput.date,
        amount: accountBalanceCreateInput.amount,
        createdBy: accountBalanceCreateInput.createdBy,
      });
    });
  });
});
