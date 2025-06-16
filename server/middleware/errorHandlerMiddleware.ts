import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { type CustomErrorWithStatus } from '../errors/customErrors';

const errorHandlerMiddleware = (err: Error, req: Request, res: Response) => {
  console.error(err);

  const statusCode =
    (err as CustomErrorWithStatus)?.statusCode ||
    StatusCodes.INTERNAL_SERVER_ERROR;

  const msg = err.message || 'something went wrong, try again later';

  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
