import Wrapper from './Wrapper';
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../utils/customFetch';
import { toast } from 'react-toastify';

interface LogoutContainerProps {
  userName: string;
}

const LogoutContainer = ({ userName }: LogoutContainerProps) => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState<boolean>(false);

  const handleToggleClick = (): void => {
    setShowLogout(!showLogout);
  };

  const handleUserLogout = async (): Promise<void> => {
    navigate('/');
    await logoutUser();
    toast.success('Logged out');
  };

  return (
    <Wrapper>
      <button
        type="button"
        className="btn user-btn"
        onClick={handleToggleClick}
      >
        <FaUserCircle />
        {userName}
        <FaCaretDown />
      </button>
      <div className={`dropdown ${showLogout ? 'show-dropdown' : ''}`}>
        <button
          type="button"
          className="dropdown-btn"
          onClick={handleUserLogout}
        >
          logout
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutContainer;
