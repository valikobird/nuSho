import type { NextFunction, Request, Response } from 'express';
import { AuthenticationError } from '../../../domain/errors/DomainErrors';
import { Container } from '../../../infrastructure/Container';
import type { TokenPayload } from '../../../domain/ports/TokenService';
import type { UserInfoNoPassword } from '../../../domain/ports/UserRepository';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { token } = req.cookies;
  if (!token) {
    throw new AuthenticationError('Authentication failed');
  }

  try {
    const userDetails: TokenPayload = Container.getInstance().getUserUseCases().getUserTokenData(token);
    req.user = { id: userDetails.userId } satisfies Partial<UserInfoNoPassword>;

    next();
  } catch {
    throw new AuthenticationError('Authentication failed');
  }
};
