import { model, Schema } from 'mongoose';
import { User } from '@shared/interfaces';
import { USER_ROLES } from '@shared/constants';
import { UserWithoutPassword } from '../types';

const UserSchema = new Schema<User>(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
  },
  { timestamps: true }
);

UserSchema.methods.json = function (): UserWithoutPassword {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default model('User', UserSchema);
