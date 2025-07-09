import mongoose from 'mongoose';
import type { AccountBalanceInfo } from '../../../domain/ports/AccountBalanceRepository';

const AccountBalanceSchema = new mongoose.Schema<AccountBalanceInfo>(
  {
    account: {
      type: mongoose.Types.ObjectId,
      ref: 'Account',
    },
    date: Date,
    amount: Number,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('AccountBalance', AccountBalanceSchema);
