import Wrapper from './Wrapper';
import { useLoaderData } from 'react-router-dom';
import type { Account } from '@shared/interfaces';

const Dashboard = () => {
  const accounts = useLoaderData();

  return (
    <Wrapper>
      <div className="accounts-container">
        {accounts.map((account: Account) => {
          return (
            <div className="account-card">
              <h5 className="title">{account.name}</h5>
              <p className="account-type">
                {account.type.toLowerCase()} ({account.currencyCode})
              </p>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Dashboard;
