import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';
import type { User } from '@shared/interfaces';
import { USER_ROLES } from '@shared/constants.ts';
import type { ActionProps, GeneralApiResponse } from '../../interfaces';
import { registerUser } from '../../utils/customFetch';

const action = async ({ request }: ActionProps) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const newUser: User = {
    name: data.name.toString(),
    email: data.email.toString(),
    password: data.password.toString(),
    role: USER_ROLES.USER,
  };

  try {
    const response: GeneralApiResponse = await registerUser(newUser);
    toast.success(response.msg);
    return redirect('/login');
  } catch (err) {
    toast.error((err as Error).message);
    return err;
  }
};

export default action;
