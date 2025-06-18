import { NextFunction, Request, Response } from 'express';
import {
  body,
  Result,
  ValidationChain,
  ValidationError,
  validationResult,
} from 'express-validator';
import { BadRequestError } from '../errors/customErrors';
import UserModel from '../models/UserModel';
import { UserDocument } from '../interfaces';

const withValidationErrors = (validateValues: ValidationChain[]) => {
  return [
    ...validateValues,
    (req: Request, res: Response, next: NextFunction): void => {
      const errors: Result<ValidationError> = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages: any[] = errors
          .array()
          .map((error: ValidationError): any => error.msg);
        const firstMessage = errorMessages[0];

        return next(new BadRequestError(errorMessages));
      }

      next();
    },
  ];
};

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email: string) => {
      const user: UserDocument | null = await UserModel.findOne({ email });
      if (user) {
        throw new BadRequestError('email already taken');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
]);
