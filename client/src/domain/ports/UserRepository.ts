import type { User } from '../entities/User';

export interface UserRepository {
  register(userData: UserRegisterData): Promise<void>;
  login(credentials: LoginCredentials): Promise<void>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User>;
}

export interface UserResponse {
  user: UserInfoNoPassword;
}

export type UserRegisterData = Omit<UserInfo, 'id' | 'createdAt' | 'updatedAt'>;

export type UserInfoNoPassword = Omit<UserInfo, 'password'>;

export interface UserInfo {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
