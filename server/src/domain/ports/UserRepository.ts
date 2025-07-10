import type { User } from '../entities/User';

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

export type UserInfoNoPassword = Omit<UserInfo, 'password'>;

export type UserRegisterInput = Omit<UserInfo, 'createdAt' | 'updatedAt'>;

export type UserLoginInput = Omit<UserInfo, 'id' | 'name' | 'createdAt' | 'updatedAt'>;
