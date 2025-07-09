import Wrapper from './Wrapper';
import type { Account } from '../../../domain/entities/Account';
import { useLoaderData } from 'react-router-dom';
import { MdOutlineInput } from 'react-icons/md';
import { FaScaleBalanced } from 'react-icons/fa6';

const Dashboard = () => {
  const accounts: Account[] = useLoaderData() as Account[];

  return (
    <Wrapper>
      <div className="accounts-container">
        {accounts.map((account: Account) => {
          return (
            <div className="account-card" key={account.id}>
              <div className="info">
                <h5 className="title">{account.name}</h5>
                <p className="account-type">
                  {account.type.toLowerCase()} ({account.currencyCode})
                </p>
                {account.isLinked() && <p className="linked-info">Linked Account</p>}
                {!account.isActive() && <p className="status-info">Disabled</p>}
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
