import type { Container } from '../../../infrastructure/Container';
import type { ActionProps } from '../../types';
import { redirect } from 'react-router-dom';
import type { AccountType } from '../../../domain/ports/AccountRepository';

const action = (container: Container) => {
  const accountUseCases = container.getAccountUseCases();

  return async ({ request }: ActionProps) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await accountUseCases.createAccount({
        name: data.name.toString(),
        type: data.type.toString() as AccountType,
        currencyCode: data.currency.toString(),
      });
      return redirect('/userspace');
    } catch (err) {
      return err;
    }
  };
};

export default action;
