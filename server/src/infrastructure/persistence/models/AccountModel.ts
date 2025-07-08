import mongoose from 'mongoose';
import { ACCOUNT_TYPES, AccountInfo } from '../../../domain/ports/AccountRepository';

const AccountSchema = new mongoose.Schema<AccountInfo>(
  {
    name: String,
    type: {
      type: String,
      enum: Object.keys(ACCOUNT_TYPES),
    },
    currencyCode: String,
    linkedTo: {
      type: mongoose.Types.ObjectId,
      ref: 'Account',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Account', AccountSchema);
