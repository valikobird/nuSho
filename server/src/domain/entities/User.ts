import type { UserInfoNoPassword } from '../ports/UserRepository';

export class User implements UserInfoNoPassword {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(name: string, email: string): Omit<UserInfoNoPassword, 'createdAt' | 'updatedAt'> {
    return {
      name,
      email,
    };
  }
}
