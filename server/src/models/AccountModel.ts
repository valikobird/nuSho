import mongoose, { model, Schema } from 'mongoose';
import { Account } from '@shared/interfaces';
import { ACCOUNT_TYPES } from '@shared/constants';

const AccountSchema = new Schema<Account>(
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

export default model('Account', AccountSchema);
