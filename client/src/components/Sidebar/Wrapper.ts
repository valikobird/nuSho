import styled from 'styled-components';

const Wrapper = styled.aside`
  display: none;

  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0 0 0 rgba(0, 0, 0, 0.1);

    .sidebar-container {
      background-color: var(--bg-secondary);
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: margin-left 0.3s ease-in-out;
    }

    .show-sidebar {
      margin-left: 0;
    }

    .content {
      position: sticky;
      top: 0;
    }

    header {
      height: var(--nav-height);
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }

    .logo {
      height: 3rem;
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
      padding: 1rem 0 1rem 2.5rem;
      text-transform: capitalize;
      transition: padding-left 0.3s ease-in-out;
      font-weight: 500;

      &:hover {
        padding-left: 3rem;
        color: var(--accent-primary);
        transition: var(--transition);
      }
    }

    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
    }

    .active {
      color: var(--accent-primary);
    }

    .pending {
      background-color: var(--bg-primary);
    }
  }
`;

export default Wrapper;
