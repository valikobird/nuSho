import { UserInfo, UserRegisterInput, UserRepository } from '../../domain/ports/UserRepository';
import { User } from '../../domain/entities/User';
import UserModel from '../persistence/models/UserModel';
import mongoose, { Document } from 'mongoose';

interface UserDocument extends Omit<UserInfo, 'id'>, Document {
  _id: mongoose.Types.ObjectId;
}

export class MongoUserRepository implements UserRepository {
  async create(userData: UserRegisterInput & { password: string }): Promise<User> {
    const userDoc = (await UserModel.create(userData)) satisfies UserDocument;
    return this.toDomainEntity(userDoc);
  }
  async findByEmail(email: string): Promise<User | null> {
    const userDoc = (await UserModel.findOne({ email })) satisfies UserDocument | null;
    return userDoc ? this.toDomainEntity(userDoc) : null;
  }

  async findByEmailWithPassword(email: string): Promise<{ user: User; password: string } | null> {
    const userDoc = (await UserModel.findOne({ email })) satisfies UserDocument | null;
    if (userDoc) {
      return {
        user: this.toDomainEntity(userDoc),
        password: userDoc.password,
      };
    }
    return null;
  }

  async findById(id: string): Promise<User | null> {
    const userDoc = (await UserModel.findById(id)) satisfies UserDocument | null;
    return userDoc ? this.toDomainEntity(userDoc) : null;
  }

  private toDomainEntity(userDoc: UserDocument): User {
    return new User(userDoc._id.toString(), userDoc.name, userDoc.email, userDoc.createdAt, userDoc.updatedAt);
  }
}
