import type { UserDocument } from '../infrastructure/adapters/MongoUserRepository';
import { BcryptPasswordService } from '../infrastructure/adapters/BcryptPasswordService';
import UserModel from '../infrastructure/persistence/models/UserModel';
import AccountModel from '../infrastructure/persistence/models/AccountModel';
import { Account } from '../domain/entities/Account';

export const createTestUser = async (overrides: Partial<unknown> = {}) => {
  const passwordService = new BcryptPasswordService();
  const hashedPassword = await passwordService.hash('password123');

  const userData = {
    name: 'Test User',
    email: 'test@example.com',
    password: hashedPassword,
    ...overrides,
  };

  return (await UserModel.create(userData)) satisfies UserDocument;
};

export const createTestAccount = async (userId: string, overrides: Partial<unknown> = {}) => {
  const accountData = {
    name: 'Test Account',
    type: 'CHECKING',
    currencyCode: 'USD',
    createdBy: userId,
    enabled: true,
    ...overrides,
  };

  const accountDoc = await AccountModel.create(accountData);

  return new Account(
    accountDoc._id.toString(),
    accountDoc.name,
    accountDoc.type,
    accountDoc.currencyCode,
    accountDoc.createdBy,
    accountDoc.enabled,
    accountDoc.createdAt,
    accountDoc.updatedAt,
    accountDoc.linkedTo
  );
};
