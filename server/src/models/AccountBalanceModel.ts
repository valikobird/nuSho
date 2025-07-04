import mongoose from 'mongoose';
import { AccountBalance } from '@shared/interfaces';

const AccountBalanceSchema = new mongoose.Schema<AccountBalance>(
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
