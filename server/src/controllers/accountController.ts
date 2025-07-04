import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AccountModel from '../models/AccountModel';
import { UnauthenticatedError } from '../errors/customErrors';
import { UserDetails } from '@shared/interfaces';
import AccountBalanceModel from '../models/AccountBalanceModel';

export const createAccount = async (req: Request, res: Response): Promise<void> => {
  const user = req.user;
  checkUser(user);

  req.body.createdBy = user!.userId;

  await AccountModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'account created successfully' });
};

export const getEnabledAccounts = async (req: Request, res: Response): Promise<void> => {
  const user = req.user;
  checkUser(user);

  const accounts = await AccountModel.find({
    createdBy: user!.userId,
    enabled: true,
  });
  res.status(StatusCodes.OK).json({ accounts });
};

export const getNotLinkedAccounts = async (req: Request, res: Response): Promise<void> => {
  const user = req.user;
  checkUser(user);

  const accounts = await AccountModel.find({
    createdBy: user!.userId,
    enabled: true,
    $or: [{ linkedTo: { $exists: false } }, { linkedTo: { $eq: null } }],
  });

  res.status(StatusCodes.OK).json({ accounts });
};

export const setAccountBalance = async (req: Request, res: Response): Promise<void> => {
  const user = req.user;
  checkUser(user);

  req.body.account = req.params.id;
  req.body.createdBy = user!.userId;

  await AccountBalanceModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'account balance changed successfully' });
};

const checkUser = (user?: UserDetails) => {
  if (!user) {
    throw new UnauthenticatedError('User is not logged in');
  }
};
