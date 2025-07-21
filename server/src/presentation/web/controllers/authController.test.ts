import type { MockedFunction } from 'vitest';
import { describe, it, expect, beforeEach } from 'vitest';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from '../routes/authRouter';
import errorHandlerMiddleware from '../middleware/errorHandlerMiddleware';
import request from 'supertest';
import { expectNotFoundError, expectUnauthorizedError, expectValidationError } from '../../../test/responseHelpers';
import { createTestUser } from '../../../test/testDataFactories';
import type { UserUseCases } from '../../../application/usecases/UserUseCases';
import { Container } from '../../../infrastructure/Container';
import { AuthenticationError, NotFoundError, ValidationError } from '../../../domain/errors/DomainErrors';
import type { UserLoginInput } from '../../../domain/ports/UserRepository';

const createTestApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api/v1/auth', authRouter);
  app.use(errorHandlerMiddleware);
  return app;
};

describe('Auth Controller', () => {
  let app: express.Application;
  let mockUserUseCases: {
    [K in keyof UserUseCases]: MockedFunction<UserUseCases[K]>;
  };

  beforeEach(() => {
    app = createTestApp();

    const container = Container.getInstance();
    mockUserUseCases = container.getUserUseCases() as unknown as {
      [K in keyof UserUseCases]: MockedFunction<UserUseCases[K]>;
    };
    mockUserUseCases.registerUser.mockReset();
    mockUserUseCases.loginUser.mockReset();
  });

  describe('POST /api/v1/auth/register', () => {
    it('should validate required fields', async () => {
      const response = await request(app).post('/api/v1/auth/register').send({});

      expectValidationError(response);
    });

    it('should validate email format', async () => {
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123',
      };

      const response = await request(app).post('/api/v1/auth/register').send(userData);

      expectValidationError(response, 'email');
    });

    it('should validate password length', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123',
      };

      const response = await request(app).post('/api/v1/auth/register').send(userData);

      expectValidationError(response, 'password');
    });

    it('should not allow duplicate email registration', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      await createTestUser({ email: userData.email });

      mockUserUseCases.registerUser.mockImplementation(() => {
        throw new ValidationError('User already exists');
      });

      const response = await request(app).post('/api/v1/auth/register').send(userData);

      expectValidationError(response, 'user already exists');
    });

    it('should register a new user successfully', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      const mockedToken = 'mock-jwt-token';

      mockUserUseCases.registerUser.mockResolvedValue({ token: mockedToken });

      const response = await request(app).post('/api/v1/auth/register').send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('msg');

      const cookieHeader = response.headers['set-cookie'];
      expect(cookieHeader).toBeDefined();
      expect(cookieHeader[0]).toContain(`token=${mockedToken}`);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should validate required fields', async () => {
      const response = await request(app).post('/api/v1/auth/login').send({});

      expectValidationError(response);
    });

    it('should reject non-existent user', async () => {
      const userData = {
        email: 'nonexistent@example.com',
        password: 'password123',
      } satisfies UserLoginInput;

      mockUserUseCases.loginUser.mockImplementation(() => {
        throw new NotFoundError('Invalid credentials');
      });

      const response = await request(app).post('/api/v1/auth/login').send(userData);

      expectNotFoundError(response);
    });

    it('should reject invalid credentials', async () => {
      const userData = {
        email: 'john@example.com',
        password: 'wrongpassword',
      } satisfies UserLoginInput;

      mockUserUseCases.loginUser.mockImplementation(() => {
        throw new AuthenticationError('Invalid credentials');
      });

      const response = await request(app).post('/api/v1/auth/login').send(userData);

      expectUnauthorizedError(response);
    });

    it('should login user successfully', async () => {
      const userData = {
        email: 'john@example.com',
        password: 'password123',
      };
      const mockedToken = 'mock-jwt-token';

      mockUserUseCases.loginUser.mockResolvedValue({ token: mockedToken });

      const response = await request(app).post('/api/v1/auth/login').send(userData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('msg');

      const cookieHeader = response.headers['set-cookie'];
      expect(cookieHeader).toBeDefined();
      expect(cookieHeader[0]).toContain(`token=${mockedToken}`);
    });
  });

  describe('GET /api/v1/auth/logout', () => {
    it('should logout user successfully', async () => {
      const response = await request(app).get('/api/v1/auth/logout');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('msg');

      const cookieHeader = response.headers['set-cookie'];
      expect(cookieHeader).toBeDefined();
      expect(cookieHeader[0]).toContain('token=;');
    });
  });
});
