import type { UserDocument } from '../infrastructure/adapters/MongoUserRepository';
import { BcryptPasswordService } from '../infrastructure/adapters/BcryptPasswordService';
import UserModel from '../infrastructure/persistence/models/UserModel';

export const createTestUser = async (overrides: Partial<unknown> = {}) => {
  const passwordService = new BcryptPasswordService();
  const hashedPassword = await passwordService.hash('password123');

  const userData = {
    name: 'Test User',
    email: 'test@example.com',
    password: hashedPassword,
    ...overrides,
  };

  const response = (await UserModel.create(userData)) satisfies UserDocument;

  return response;
};
