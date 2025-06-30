import type { ActionProps, GeneralApiResponse } from '../../interfaces';
import type { Account } from '@shared/interfaces';
import type { AccountType } from '@shared/types';
import { toast } from 'react-toastify';
import { createAccount } from '../../utils/customFetch';
import { redirect } from 'react-router-dom';

const action = async ({ request }: ActionProps) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const newAccount: Partial<Account> = {
    name: data.name.toString(),
    type: data.type.toString() as AccountType,
    currencyCode: data.currency.toString(),
  };

  if (data.linkedTo) {
    newAccount.linkedTo = data.linkedTo.toString();
  }

  try {
    const response: GeneralApiResponse = await createAccount(newAccount);
    toast.success(response.msg);
    return redirect('/userspace');
  } catch (err) {
    toast.error((err as Error).message);
    return err;
  }
};

export default action;
