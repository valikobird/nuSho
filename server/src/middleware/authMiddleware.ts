import { NextFunction, Request, Response } from 'express';
import { UnauthenticatedError } from '../errors/customErrors';
import { verifyJwt } from '../utils/tokenUtils';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError('authentication failed');
  }

  try {
    req.user = verifyJwt(token);
    next();
  } catch {
    throw new UnauthenticatedError('authentication failed');
  }
};
