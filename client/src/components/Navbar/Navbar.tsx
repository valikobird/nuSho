import Wrapper from './Wrapper';
import { FaAlignLeft } from 'react-icons/fa';
import Logo from '../Logo';
import ThemeToggle from '../ThemeToggle';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
