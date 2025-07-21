import { describe, it, expect } from 'vitest';
import { Account } from './Account';
import type { AccountInfo } from '../ports/AccountRepository.ts';

describe('Account Entity', () => {
  describe('constructor', () => {
    it('should create an Account instance with all properties', () => {
      const accountData = {
        id: '1',
        name: 'Checking Account',
        type: 'CHECKING',
        currencyCode: 'USD',
        linkedTo: null,
        createdBy: 'user123',
        enabled: true,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-02'),
      } satisfies AccountInfo;

      const account = new Account(
        accountData.id,
        accountData.name,
        accountData.type,
        accountData.currencyCode,
        accountData.linkedTo,
        accountData.createdBy,
        accountData.enabled,
        accountData.createdAt,
        accountData.updatedAt
      );

      expect(account.id).toBe(accountData.id);
      expect(account.name).toBe(accountData.name);
      expect(account.type).toBe(accountData.type);
      expect(account.currencyCode).toBe(accountData.currencyCode);
      expect(account.linkedTo).toBe(accountData.linkedTo);
      expect(account.createdBy).toBe(accountData.createdBy);
      expect(account.enabled).toBe(accountData.enabled);
      expect(account.createdAt).toBe(accountData.createdAt);
      expect(account.updatedAt).toBe(accountData.updatedAt);
    });
  });

  describe('isActive', () => {
    it('should return true when account is enabled', () => {
      const accountData = {
        id: '1',
        name: 'Test Account',
        type: 'CHECKING',
        currencyCode: 'USD',
        linkedTo: null,
        createdBy: 'user123',
        enabled: true,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-02'),
      } satisfies AccountInfo;

      const account = new Account(
        accountData.id,
        accountData.name,
        accountData.type,
        accountData.currencyCode,
        accountData.linkedTo,
        accountData.createdBy,
        accountData.enabled,
        accountData.createdAt,
        accountData.updatedAt
      );

      expect(account.isActive()).toBe(true);
    });

    it('should return false when account is disabled', () => {
      const accountData = {
        id: '1',
        name: 'Test Account',
        type: 'CHECKING',
        currencyCode: 'USD',
        linkedTo: null,
        createdBy: 'user123',
        enabled: false,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-02'),
      } satisfies AccountInfo;

      const account = new Account(
        accountData.id,
        accountData.name,
        accountData.type,
        accountData.currencyCode,
        accountData.linkedTo,
        accountData.createdBy,
        accountData.enabled,
        accountData.createdAt,
        accountData.updatedAt
      );

      expect(account.isActive()).toBe(false);
    });
  });

  describe('isLinked', () => {
    it('should return true when account is linked', () => {
      const accountData = {
        id: '1',
        name: 'Test Account',
        type: 'CHECKING',
        currencyCode: 'USD',
        linkedTo: 'linked-account-id',
        createdBy: 'user123',
        enabled: true,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-02'),
      } satisfies AccountInfo;

      const account = new Account(
        accountData.id,
        accountData.name,
        accountData.type,
        accountData.currencyCode,
        accountData.linkedTo,
        accountData.createdBy,
        accountData.enabled,
        accountData.createdAt,
        accountData.updatedAt
      );

      expect(account.isLinked()).toBe(true);
    });

    it('should return false when account is not linked', () => {
      const accountData = {
        id: '1',
        name: 'Test Account',
        type: 'CHECKING',
        currencyCode: 'USD',
        linkedTo: null,
        createdBy: 'user123',
        enabled: true,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-02'),
      } satisfies AccountInfo;

      const account = new Account(
        accountData.id,
        accountData.name,
        accountData.type,
        accountData.currencyCode,
        accountData.linkedTo,
        accountData.createdBy,
        accountData.enabled,
        accountData.createdAt,
        accountData.updatedAt
      );

      expect(account.isLinked()).toBe(false);
    });
  });

  describe('getDisplayName', () => {
    it('should return formatted display name', () => {
      const accountData = {
        id: '1',
        name: 'My Checking Account',
        type: 'CHECKING',
        currencyCode: 'USD',
        linkedTo: null,
        createdBy: 'user123',
        enabled: true,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-02'),
      } satisfies AccountInfo;

      const account = new Account(
        accountData.id,
        accountData.name,
        accountData.type,
        accountData.currencyCode,
        accountData.linkedTo,
        accountData.createdBy,
        accountData.enabled,
        accountData.createdAt,
        accountData.updatedAt
      );

      expect(account.getDisplayName()).toBe('My Checking Account (USD)');
    });
  });

  describe('fromApiResponse', () => {
    it('should create Account from API response', () => {
      const apiData = {
        id: '1',
        name: 'Test Account',
        type: 'INVESTMENT',
        currencyCode: 'EUR',
        linkedTo: 'linked-id',
        createdBy: 'user123',
        enabled: true,
      } satisfies AccountInfo;

      const account = Account.fromApiResponse(apiData);

      expect(account.id).toBe(apiData.id);
      expect(account.name).toBe(apiData.name);
      expect(account.type).toBe(apiData.type);
      expect(account.currencyCode).toBe(apiData.currencyCode);
      expect(account.linkedTo).toBe(apiData.linkedTo);
      expect(account.createdBy).toBe(apiData.createdBy);
      expect(account.enabled).toBe(apiData.enabled);
    });

    it('should handle null linkedTo', () => {
      const apiData = {
        id: '1',
        name: 'Test Account',
        type: 'CHECKING',
        currencyCode: 'USD',
        linkedTo: null,
        createdBy: 'user123',
        enabled: true,
      } satisfies AccountInfo;

      const account = Account.fromApiResponse(apiData);

      expect(account.linkedTo).toBe(null);
    });
  });
});
