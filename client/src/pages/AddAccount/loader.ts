import cc from 'currency-codes';
import type { AccountsResponse, GeneralApiResponse } from '../../interfaces';
import { getNotLinkedAccounts } from '../../utils/customFetch';
import { toast } from 'react-toastify';
import type { Account } from '@shared/interfaces';
import { ACCOUNT_TYPES } from '@shared/constants';

const loader = async () => {
  const accountTypes: string[][] = Object.entries(ACCOUNT_TYPES);
  const currencies: string[][] = cc.data.map(({ code, currency }) => [code, `${code} - ${currency}`]);

  let accounts: Account[];
  try {
    const response: AccountsResponse | GeneralApiResponse = await getNotLinkedAccounts();
    if ((response as GeneralApiResponse).msg) {
      toast.error((response as GeneralApiResponse).msg);
      accounts = [];
    } else {
      accounts = (response as AccountsResponse).accounts;
    }
  } catch {
    toast.error('Failed to load accounts');
    accounts = [];
  }

  return { accounts, accountTypes, currencies };
};

export default loader;
