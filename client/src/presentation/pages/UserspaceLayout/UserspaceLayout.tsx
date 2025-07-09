import Wrapper from './Wrapper';
import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { Navbar, Sidebar, SidebarPopup } from '../../components';
import type { User } from '../../../domain/entities/User';

const UserspaceLayout = () => {
  const user = useLoaderData() satisfies User;
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Wrapper>
      <main className="userspace">
        <SidebarPopup showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        <div>
          <Navbar toggleSidebar={toggleSidebar} userName={user?.getDisplayName() || ''} />
          <div className="userspace-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default UserspaceLayout;
