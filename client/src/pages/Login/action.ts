import type { ActionProps, GeneralApiResponse } from '../../interfaces';
import { toast } from 'react-toastify';
import { loginUser } from '../../utils/customFetch';
import { redirect } from 'react-router-dom';

const action = async ({ request }: ActionProps) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response: GeneralApiResponse = await loginUser({
      email: data.email.toString(),
      password: data.password.toString(),
    });
    toast.success(response.msg);
    return redirect('/dashboard');
  } catch (err) {
    toast.error((err as Error).message);
    return err;
  }
};

export default action;
