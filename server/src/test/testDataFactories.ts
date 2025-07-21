import { BcryptPasswordService } from '../infrastructure/adapters/BcryptPasswordService';
import UserModel from '../infrastructure/persistence/models/UserModel';
import AccountModel from '../infrastructure/persistence/models/AccountModel';
import { Account } from '../domain/entities/Account';
import { User } from '../domain/entities/User';

export const createTestUser = async (overrides: Partial<unknown> = {}) => {
  const passwordService = new BcryptPasswordService();
  const hashedPassword = await passwordService.hash('password123');

  const userData = {
    name: 'Test User',
    email: 'test@example.com',
    password: hashedPassword,
    ...overrides,
  };

  const userDoc = await UserModel.create(userData);

  return new User(userDoc._id.toString(), userDoc.name, userDoc.email, userDoc.createdAt, userDoc.updatedAt);
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
