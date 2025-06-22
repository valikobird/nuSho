import { NavLink } from 'react-router-dom';
import links, { type NavLinkDetails } from '../utils/links';

interface NavLinksProps {
  isSidebarPopup?: boolean;
  toggleSidebar: () => void;
}

const NavLinks = ({ isSidebarPopup, toggleSidebar }: NavLinksProps) => {
  const handleLinkClick = () => {
    if (isSidebarPopup) {
      toggleSidebar();
    }
  };

  return (
    <div className="nav-links">
      {links.map((link: NavLinkDetails) => {
        const { text, path, icon } = link;
        return (
          <NavLink to={path} key={text} className="nav-link" onClick={handleLinkClick}>
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
