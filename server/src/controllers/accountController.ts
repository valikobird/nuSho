import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AccountModel from '../models/AccountModel';
import { UnauthenticatedError } from '../errors/customErrors';
import { UserDetails } from '@shared/interfaces';

const createAccount = async (req: Request, res: Response): Promise<void> => {
  const user = req.user;
  checkUser(user);

  req.body.createdBy = user!.userId;

  await AccountModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'account created successfully' });
};

const getEnabledAccounts = async (req: Request, res: Response): Promise<void> => {
  const user = req.user;
  checkUser(user);

  const accounts = await AccountModel.find({
    createdBy: user!.userId,
    enabled: true,
  });
  res.status(StatusCodes.OK).json({ accounts });
};

const getNotLinkedAccounts = async (req: Request, res: Response): Promise<void> => {
  const user = req.user;
  checkUser(user);

  const accounts = await AccountModel.find({
    createdBy: user!.userId,
    enabled: true,
    $or: [{ linkedTo: { $exists: false } }, { linkedTo: { $eq: null } }],
  });

  res.status(StatusCodes.OK).json({ accounts });
};

const checkUser = (user?: UserDetails) => {
  if (!user) {
    throw new UnauthenticatedError('User is not logged in');
  }
};

export { createAccount, getEnabledAccounts, getNotLinkedAccounts };
