import styled from 'styled-components';

const Wrapper = styled.section`
  nav {
    justify-content: space-between;
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  h1 {
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.1;
  }

  p {
    line-height: 2;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    max-width: 35rem;
  }

  .highlight {
    color: var(--accent-primary);
    font-weight: 700;
  }

  .register-link {
    margin-right: 1rem;
  }

  .main-img {
    display: none;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }

    .main-img {
      display: block;
    }
  }
`;

export default Wrapper;
