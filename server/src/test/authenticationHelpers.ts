import type { Application } from 'express';
import request from 'supertest';
import { createTestUser } from './testDataFactories';
import type { UserDocument } from '../infrastructure/adapters/MongoUserRepository';

export const loginUser = async (app: Application, email: string, password: string) => {
  const response = await request(app).post('/api/v1/auth/login').send({ email, password });

  return response.headers['set-cookie'];
};

export const createAuthenticatedUser = async (app: Application, userOverrides: Partial<unknown> = {}) => {
  const user = (await createTestUser(userOverrides)) satisfies UserDocument;
  const cookies = await loginUser(app, user.email, 'password123');

  return { user, cookies };
};
