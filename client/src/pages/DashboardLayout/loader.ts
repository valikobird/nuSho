import { redirect } from 'react-router-dom';
import type { UserDocumentWithoutPassword } from '@shared/types';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../../utils/customFetch';

const loader = async (): Promise<Response | UserDocumentWithoutPassword> => {
  try {
    const user: UserDocumentWithoutPassword =
      (await getCurrentUser()) as UserDocumentWithoutPassword;
    return user;
  } catch {
    toast.error('Failed to load user data');
    return redirect('/');
  }
};

export default loader;
