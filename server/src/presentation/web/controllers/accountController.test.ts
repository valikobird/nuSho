import type { MockedFunction } from 'vitest';
import { describe, it, expect, beforeEach } from 'vitest';
import express from 'express';
import cookieParser from 'cookie-parser';
import { authenticateUser } from '../middleware/authMiddleware';
import accountRouter from '../routes/accountRouter';
import authRouter from '../routes/authRouter';
import errorHandlerMiddleware from '../middleware/errorHandlerMiddleware';
import request from 'supertest';
import { createAuthenticatedUser } from '../../../test/authenticationHelpers';
import { createTestAccount } from '../../../test/testDataFactories';
import type { AccountUseCases } from '../../../application/usecases/AccountUseCases';
import type { AccountCreateInput, AccountType } from '../../../domain/ports/AccountRepository';
import { Container } from '../../../infrastructure/Container';
import { expectUnauthorizedError, expectValidationError, expectNotFoundError } from '../../../test/responseHelpers';
import type { AccountBalanceCreateInput } from '../../../domain/ports/AccountBalanceRepository';
import type { AccountBalanceUseCases } from '../../../application/usecases/AccountBalanceUseCases';

const createTestApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/accounts', authenticateUser, accountRouter);
  app.use(errorHandlerMiddleware);
  return app;
};

describe('Account Controller', () => {
  let app: express.Application;
  let mockAccountUseCases: {
    [K in keyof AccountUseCases]: MockedFunction<AccountUseCases[K]>;
  };
  let mockAccountBalanceUseCases: {
    [K in keyof AccountBalanceUseCases]: MockedFunction<AccountBalanceUseCases[K]>;
  };

  beforeEach(() => {
    app = createTestApp();

    const container = Container.getInstance();
    mockAccountUseCases = container.getAccountUseCases() as unknown as {
      [K in keyof AccountUseCases]: MockedFunction<AccountUseCases[K]>;
    };
    mockAccountUseCases.getEnabledAccountsByUser.mockReset();
    mockAccountUseCases.createAccount.mockReset();
    mockAccountUseCases.getUserAccountById.mockReset();

    mockAccountBalanceUseCases = container.getAccountBalanceUseCases() as unknown as {
      [K in keyof AccountBalanceUseCases]: MockedFunction<AccountBalanceUseCases[K]>;
    };
    mockAccountBalanceUseCases.createAccountBalance.mockReset();
  });

  describe('GET /api/v1/accounts', () => {
    it('should get user accounts successfully', async () => {
      const { user, cookies } = await createAuthenticatedUser(app);

      expect(user).toBeDefined();
      expect(user.email).toBe('test@example.com');
      expect(user.name).toBe('Test User');
      expect(user._id).toBeDefined();

      expect(cookies).toBeDefined();
      expect(Array.isArray(cookies)).toBe(true);
      expect(cookies.length).toBeGreaterThan(0);

      const account_1 = await createTestAccount(user._id.toString(), {
        name: 'Checking Account',
      });
      const account_2 = await createTestAccount(user._id.toString(), { name: 'Savings Account' });

      mockAccountUseCases.getEnabledAccountsByUser.mockResolvedValue([account_1, account_2]);

      const response = await request(app).get('/api/v1/accounts').set('Cookie', cookies);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accounts');
      expect(Array.isArray(response.body.accounts)).toBe(true);
      expect(response.body.accounts).toHaveLength(2);
    });

    it('should require authentication', async () => {
      const response = await request(app).get('/api/v1/accounts');
      expectUnauthorizedError(response);
    });

    it('should return empty array for user with no accounts', async () => {
      const { cookies } = await createAuthenticatedUser(app);

      mockAccountUseCases.getEnabledAccountsByUser.mockResolvedValue([]);

      const response = await request(app).get('/api/v1/accounts').set('Cookie', cookies);

      expect(response.status).toBe(200);
      expect(response.body.accounts).toHaveLength(0);
    });
  });

  describe('POST /api/v1/accounts', () => {
    it('should create account successfully', async () => {
      const { cookies } = await createAuthenticatedUser(app);

      const accountData = {
        name: 'New Account',
        type: 'CHECKING',
        currencyCode: 'USD',
      } satisfies AccountCreateInput;

      const response = await request(app).post('/api/v1/accounts').set('Cookie', cookies).send(accountData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('msg');
    });

    it('should validate required fields', async () => {
      const { cookies } = await createAuthenticatedUser(app);
      const response = await request(app).post('/api/v1/accounts').set('Cookie', cookies).send({});
      expectValidationError(response);
    });

    it('should validate account type', async () => {
      const { cookies } = await createAuthenticatedUser(app);

      const accountData = {
        name: 'New Account',
        type: 'invalid-type' as unknown as AccountType,
        currencyCode: 'USD',
      } satisfies AccountCreateInput;

      const response = await request(app).post('/api/v1/accounts').set('Cookie', cookies).send(accountData);

      expectValidationError(response, 'type');
    });

    it('should validate currency code', async () => {
      const { cookies } = await createAuthenticatedUser(app);

      const accountData = {
        name: 'New Account',
        type: 'CHECKING',
        currencyCode: 'INVALID',
      };

      const response = await request(app).post('/api/v1/accounts').set('Cookie', cookies).send(accountData);

      expectValidationError(response, 'currency');
    });

    it('should require authentication', async () => {
      const accountData = {
        name: 'New Account',
        type: 'CHECKING',
        currencyCode: 'USD',
      } satisfies AccountCreateInput;

      const response = await request(app).post('/api/v1/accounts').send(accountData);

      expectUnauthorizedError(response);
    });
  });

  describe('POST /api/v1/accounts/balance', () => {
    it('should require authentication', async () => {
      const { user } = await createAuthenticatedUser(app);
      const account = await createTestAccount(user.id);

      const balanceData = {
        account,
        date: '2025-07-19',
        amount: 1235,
        createdBy: user,
      };

      const response = await request(app).post('/api/v1/accounts/balance').send(balanceData);

      expectUnauthorizedError(response);
    });

    it('should create account balance successfully', async () => {
      const { user, cookies } = await createAuthenticatedUser(app);
      const account = await createTestAccount(user.id);

      const balanceData = {
        account,
        date: new Date(),
        amount: 1235,
        createdBy: user,
      } satisfies AccountBalanceCreateInput;

      const response = await request(app).post('/api/v1/accounts/balance').set('Cookie', cookies).send(balanceData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('msg');
    });

    it('should validate required fields', async () => {
      const { cookies } = await createAuthenticatedUser(app);

      const response = await request(app).post('/api/v1/accounts/balance').set('Cookie', cookies).send({});

      expectValidationError(response);
    });

    it('should validate account is provided', async () => {
      const { user, cookies } = await createAuthenticatedUser(app);
      const balanceData = {
        date: new Date(),
        amount: 1235,
        createdBy: user,
      };

      const response = await request(app).post('/api/v1/accounts/balance').set('Cookie', cookies).send(balanceData);

      expectValidationError(response, 'account');
    });

    it('should check if existing account provided', async () => {
      const { user, cookies } = await createAuthenticatedUser(app);

      const nonExistentAccountId = '507f1f77bcf86cd799439011';
      const { NotFoundError } = await import('../../../domain/errors/DomainErrors');
      mockAccountUseCases.getUserAccountById.mockRejectedValue(new NotFoundError('Account not found'));
      mockAccountBalanceUseCases.createAccountBalance.mockRejectedValue(new NotFoundError('Account not found'));

      const balanceData = {
        account: nonExistentAccountId,
        date: new Date(),
        amount: 1235,
        createdBy: user,
      } satisfies AccountBalanceCreateInput;

      const response = await request(app).post('/api/v1/accounts/balance').set('Cookie', cookies).send(balanceData);

      expectNotFoundError(response);
    });

    it('should validate date is provided', async () => {
      const { user, cookies } = await createAuthenticatedUser(app);
      const account = await createTestAccount(user.id);

      const balanceData = {
        account,
        amount: 1235,
        createdBy: user,
      };

      const response = await request(app).post('/api/v1/accounts/balance').set('Cookie', cookies).send(balanceData);

      expectValidationError(response, 'date');
    });

    it('should validate amount is provided', async () => {
      const { user, cookies } = await createAuthenticatedUser(app);
      const account = await createTestAccount(user.id);

      const balanceData = {
        account,
        date: new Date(),
        createdBy: user,
      };

      const response = await request(app).post('/api/v1/accounts/balance').set('Cookie', cookies).send(balanceData);

      expectValidationError(response, 'amount');
    });

    it('should validate created by is provided', async () => {
      const { user, cookies } = await createAuthenticatedUser(app);
      const account = await createTestAccount(user.id);

      const balanceData = {
        account,
        date: new Date(),
        amount: 1235,
      };

      const response = await request(app).post('/api/v1/accounts/balance').set('Cookie', cookies).send(balanceData);

      expectValidationError(response, 'created by');
    });
  });
});
