import Wrapper from './Wrapper';
import { useLoaderData } from 'react-router-dom';
import type { Account } from '@shared/interfaces';
import { MdOutlineInput } from 'react-icons/md';
import { FaScaleBalanced } from 'react-icons/fa6';

const Dashboard = () => {
  const accounts: Account[] = useLoaderData();

  return (
    <Wrapper>
      <div className="accounts-container">
        {accounts.map((account: Account) => {
          return (
            <div className="account-card" key={account._id}>
              <div className="info">
                <h5 className="title">{account.name}</h5>
                <p className="account-type">
                  {account.type.toLowerCase()} ({account.currencyCode})
                </p>
              </div>
              <div className="actions">
                <MdOutlineInput />
                <FaScaleBalanced />
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Dashboard;
