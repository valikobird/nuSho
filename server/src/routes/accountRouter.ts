import express from 'express';
import { createAccount } from '../controllers/accountController';
import { validateCreateAccountInput } from '../middleware/validationMiddleware';

const accountRouter = express.Router();

accountRouter.post('/', validateCreateAccountInput, createAccount);

export default accountRouter;
