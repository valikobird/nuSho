import { Router } from 'express';
import { createAccount, getEnabledAccounts, setAccountBalance } from '../controllers/accountController';
import { validateCreateAccountBalanceInput, validateCreateAccountInput } from '../middleware/validationMiddleware';

const router = Router();

router.route('/').get(getEnabledAccounts).post(validateCreateAccountInput, createAccount);
router.route('/:id/balance').post(validateCreateAccountBalanceInput, setAccountBalance);

export default router;
