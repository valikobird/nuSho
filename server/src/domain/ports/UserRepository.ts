import { User } from '../entities/User';

export interface UserRepository {
  create(userData: Omit<UserInfo, 'createdAt' | 'updatedAt'>): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailWithPassword(email: string): Promise<{ user: User; password: string } | null>;
  findById(id: string): Promise<User | null>;
}

export interface UserInfo {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInfoNoPassword extends Omit<UserInfo, 'password'> {}

export interface UserRegisterInput extends Omit<UserInfo, 'createdAt' | 'updatedAt'> {}

export interface UserLoginInput extends Omit<UserInfo, 'name' | 'createdAt' | 'updatedAt'> {}
