import type { MockedFunction } from 'vitest';
import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import express from 'express';
import cookieParser from 'cookie-parser';
import errorHandlerMiddleware from '../middleware/errorHandlerMiddleware';
import { userRouter } from '../routes';
import { createAuthenticatedUser } from '../../../test/authenticationHelpers';
import authRouter from '../routes/authRouter';
import { authenticateUser } from '../middleware/authMiddleware';
import { expectUnauthorizedError } from '../../../test/responseHelpers';
import type { UserUseCases } from '../../../application/usecases/UserUseCases';
import { Container } from '../../../infrastructure/Container';

describe('User Controller', () => {
  let app: express.Application;
  let mockUserUseCases: {
    [K in keyof UserUseCases]: MockedFunction<UserUseCases[K]>;
  };

  const createTestApp = () => {
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', authenticateUser, userRouter);
    app.use(errorHandlerMiddleware);
    return app;
  };

  beforeEach(() => {
    app = createTestApp();

    const container = Container.getInstance();
    mockUserUseCases = container.getUserUseCases() as unknown as {
      [K in keyof UserUseCases]: MockedFunction<UserUseCases[K]>;
    };
    mockUserUseCases.getUserById.mockReset();
  });

  describe('GET /api/v1/current-user', async () => {
    it('should require authentication', async () => {
      const response = await request(app).get('/api/v1/users/current-user');
      expectUnauthorizedError(response);
    });

    it('should return user details', async () => {
      const { user, cookies } = await createAuthenticatedUser(app);

      mockUserUseCases.getUserById.mockResolvedValue(user);

      const response = await request(app).get('/api/v1/users/current-user').set('Cookie', cookies);

      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeDefined();

      const { id, name, email } = response.body.user;
      expect(id).toEqual(user.id);
      expect(name).toEqual(user.name);
      expect(email).toEqual(user.email);
    });
  });
});
