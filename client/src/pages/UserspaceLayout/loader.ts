import { redirect } from 'react-router-dom';
import type { UserDocumentWithoutPassword } from '@shared/types';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../../utils/customFetch';
import type { GeneralApiResponse, UserResponse } from '../../interfaces';

const loader = async (): Promise<Response | UserDocumentWithoutPassword> => {
  try {
    const response: UserResponse | GeneralApiResponse = await getCurrentUser();
    if ((response as GeneralApiResponse).msg) {
      toast.error((response as GeneralApiResponse).msg);
      return redirect('/');
    }

    return (response as UserResponse).user;
  } catch {
    toast.error('Failed to load user data');
    return redirect('/');
  }
};

export default loader;
