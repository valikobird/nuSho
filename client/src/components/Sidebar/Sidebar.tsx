import Wrapper from './Wrapper';
import Logo from '../Logo';
import NavLinks from '../NavLinks';

interface SidebarProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ showSidebar, toggleSidebar }: SidebarProps) => {
  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? '' : 'show-sidebar'}`}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Sidebar;
