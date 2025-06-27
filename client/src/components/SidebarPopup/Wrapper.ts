import styled from 'styled-components';

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }

  .sidebar-container {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    visibility: hidden;
  }

  .show-sidebar {
    z-index: 99;
    opacity: 1;
    visibility: visible;
  }

  .content {
    background-color: var(--bg-secondary);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--border-radius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    color: var(--red-dark);
    cursor: pointer;
  }

  .logo {
    height: 5rem;
  }

  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }

  .nav-link {
    display: flex;
    align-items: center;
    color: var(--text-secondary);
    padding: 1rem 0;
    text-transform: capitalize;
    transition: var(--transition);
    font-weight: 500;

    &:hover {
      color: var(--accent-primary);
    }
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }

  .active {
    color: var(--accent-primary);
  }
`;

export default Wrapper;
