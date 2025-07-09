import type { NextFunction, Request, Response } from 'express';
import type { Result, ValidationChain, ValidationError} from 'express-validator';
import { body, param, validationResult } from 'express-validator';
import { ValidationError as DomainValidationError } from '../../../domain/errors/DomainErrors';
import { ACCOUNT_TYPES } from '../../../domain/ports/AccountRepository';

const withValidationErrors = (validateValues: ValidationChain[]) => {
  return [
    ...validateValues,
    (req: Request, res: Response, next: NextFunction): void => {
      const errors: Result<ValidationError> = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages: any[] = errors.array().map((error: ValidationError): any => error.msg);
        return next(new DomainValidationError(errorMessages.join(', ')));
      }

      next();
    },
  ];
};

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
]);

export const validateLoginInput = withValidationErrors([
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
]);

export const validateCreateAccountInput = withValidationErrors([
  body('name').notEmpty().withMessage('Name is required'),
  body('type')
    .notEmpty()
    .withMessage('Type is required')
    .isIn(Object.keys(ACCOUNT_TYPES))
    .withMessage('Incorrect account type'),
  body('currencyCode').notEmpty().withMessage('Currency is required'),
]);

export const validateCreateAccountBalanceInput = withValidationErrors([
  param('id').notEmpty().withMessage('Account is required'),
  body('date').notEmpty().withMessage('Date is required').isDate().withMessage('Invalid date format'),
  body('amount').notEmpty().withMessage('Amount is required').isNumeric().withMessage('Invalid amount'),
]);
