import { toast } from 'react-toastify';
import { getEnabledAccounts } from '../../utils/customFetch';
import type { Account } from '@shared/interfaces';
import type { AccountsResponse, GeneralApiResponse } from '../../interfaces';

const loader = async (): Promise<Account[]> => {
  try {
    const response: AccountsResponse | GeneralApiResponse = await getEnabledAccounts();
    if ((response as GeneralApiResponse).msg) {
      toast.error((response as GeneralApiResponse).msg);
      return [];
    }
    return (response as AccountsResponse).accounts;
  } catch {
    toast.error('Failed to load accounts');
    return [];
  }
};

export default loader;
