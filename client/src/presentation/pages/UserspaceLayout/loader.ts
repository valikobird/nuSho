import type { User } from '../../../domain/entities/User';
import { redirect } from 'react-router-dom';
import type { Container } from '../../../infrastructure/Container';

const loader = (container: Container) => {
  const userUseCases = container.getUserUseCases();

  return async (): Promise<Response | User> => {
    try {
      return await userUseCases.getCurrentUser();
    } catch {
      return redirect('/');
    }
  };
};

export default loader;
