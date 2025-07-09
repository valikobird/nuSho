import Wrapper from './Wrapper';
import { FaTimes } from 'react-icons/fa';
import Logo from '../Logo';
import NavLinks from '../NavLinks';

interface SidebarProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

const SidebarPopup = ({ showSidebar, toggleSidebar }: SidebarProps) => {
  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? 'show-sidebar' : ''}`}>
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks isSidebarPopup={true} toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SidebarPopup;
