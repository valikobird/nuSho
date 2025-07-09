import type {
  UserRegisterData,
  UserRepository,
  LoginCredentials,
  UserResponse,
} from '../../domain/ports/UserRepository';
import { HttpClient } from './HttpClient';
import type { GeneralApiResponse } from '../types';
import { User } from '../../domain/entities/User';

export class ApiUserRepository implements UserRepository {
  private httpClient = new HttpClient();

  async register(userData: UserRegisterData): Promise<void> {
    await this.httpClient.post<GeneralApiResponse>('/auth/register', userData);
  }

  async login(credentials: LoginCredentials): Promise<void> {
    await this.httpClient.post<GeneralApiResponse>('/auth/login', credentials);
  }

  async logout(): Promise<void> {
    await this.httpClient.get<GeneralApiResponse>('/auth/logout');
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.httpClient.get<UserResponse>('/users/current-user');
    return User.fromApiResponse(response.user);
  }
}
