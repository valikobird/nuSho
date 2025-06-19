import Wrapper from './Wrapper';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components';
import { useState } from 'react';

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Wrapper>
      <main className="dashboard">
        <div>
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default DashboardLayout;
