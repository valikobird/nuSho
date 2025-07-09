import type { ActionProps } from '../../types';
import type { Container } from '../../../infrastructure/Container';
import { redirect } from 'react-router-dom';

const action = (container: Container) => {
  const userUseCases = container.getUserUseCases();

  return async ({ request }: ActionProps) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await userUseCases.register({
        name: data.name.toString(),
        email: data.email.toString(),
        password: data.password.toString(),
      });
      return redirect('/login');
    } catch (err) {
      return err;
    }
  };
};

export default action;
