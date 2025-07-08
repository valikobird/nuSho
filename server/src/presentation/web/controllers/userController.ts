import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Container } from '../../../infrastructure/Container';
import { User } from '../../../domain/entities/User';
import { AuthenticationError } from '../../../domain/errors/DomainErrors';

const userUseCases = Container.getInstance().getUserUseCases();

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    throw new AuthenticationError('User not authenticated');
  }

  const user = (await userUseCases.getUserById(userId)) satisfies User;
  res.status(StatusCodes.OK).json({ user });
};
