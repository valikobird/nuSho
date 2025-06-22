import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { CustomErrorWithStatus } from '../types/common';

const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);

  const statusCode: StatusCodes = (err as CustomErrorWithStatus)?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  const msg: string = err.message || 'something went wrong, try again later';

  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
