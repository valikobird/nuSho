import type { ActionProps } from '../../types';
import { redirect } from 'react-router-dom';
import type { Container } from '../../../infrastructure/Container';

const action = (container: Container) => {
  const userUseCases = container.getUserUseCases();

  return async ({ request }: ActionProps) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await userUseCases.login({
        email: data.email.toString(),
        password: data.password.toString(),
      });
      return redirect('/userspace');
    } catch (err) {
      return err;
    }
  };
};

export default action;
