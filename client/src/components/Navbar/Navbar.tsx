import Wrapper from './Wrapper';
import { FaAlignLeft } from 'react-icons/fa';
import Logo from '../Logo';
import ThemeToggle from '../ThemeToggle';
import LogoutContainer from '../LogoutContainer';

interface NavbarProps {
  toggleSidebar: () => void;
  userName: string;
}

const Navbar = ({ toggleSidebar, userName }: NavbarProps) => {
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">userspace</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer userName={userName} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
