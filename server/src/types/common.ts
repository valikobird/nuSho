import { StatusCodes } from 'http-status-codes';

export type CustomErrorWithStatus = Error & { statusCode: StatusCodes };
