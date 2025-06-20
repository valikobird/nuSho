import Wrapper from './Wrapper';
import { Outlet, useLoaderData } from 'react-router-dom';
import { Navbar, Sidebar, SidebarPopup } from '../../components';
import { useState } from 'react';
import type { UserDocumentWithoutPassword } from '@shared/types';

const DashboardLayout = () => {
  const user = useLoaderData<UserDocumentWithoutPassword>();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Wrapper>
      <main className="dashboard">
        <SidebarPopup showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        <div>
          <Navbar toggleSidebar={toggleSidebar} userName={user?.name || ''} />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default DashboardLayout;
