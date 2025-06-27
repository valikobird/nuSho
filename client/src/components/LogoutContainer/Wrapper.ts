import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;

  .user-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .dropdown {
    position: absolute;
    top: 48px;
    left: 0;
    width: 100%;
    box-shadow: var(--shadow-2);
    text-align: center;
    border-radius: var(--border-radius);
    background-color: var(--accent-primary);
    visibility: hidden;
  }

  .show-dropdown {
    visibility: visible;
  }

  .dropdown-btn {
    border-radius: var(--border-radius);
    padding: 0.5rem;
    background-color: transparent;
    border-color: transparent;
    color: var(--text-primary);
    text-transform: capitalize;
    cursor: pointer;
    width: 100%;
    height: 100%;
    font-size: 1rem;
  }
`;

export default Wrapper;
