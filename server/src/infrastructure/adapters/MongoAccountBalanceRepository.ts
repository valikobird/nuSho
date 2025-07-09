import type { AccountBalanceCreateInput, AccountBalanceRepository } from '../../domain/ports/AccountBalanceRepository';
import AccountBalanceModel from '../persistence/models/AccountBalanceModel';

export class MongoAccountBalanceRepository implements AccountBalanceRepository {
  async create(accountBalanceData: AccountBalanceCreateInput): Promise<void> {
    await AccountBalanceModel.create(accountBalanceData);
  }
}
