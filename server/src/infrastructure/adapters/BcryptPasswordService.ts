import { PasswordService } from '../../domain/ports/PasswordService';
import bcrypt from 'bcrypt';

export class BcryptPasswordService implements PasswordService {
  async hash(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
