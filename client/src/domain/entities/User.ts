import type { UserInfoNoPassword } from '../ports/UserRepository';

export class User implements UserInfoNoPassword {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  getDisplayName(): string {
    return this.name || this.email.split('@')[0];
  }

  static fromApiResponse(data: UserInfoNoPassword): User {
    return new User(data.id!, data.name, data.email, new Date(data.createdAt), new Date(data.updatedAt));
  }
}
