import styled from 'styled-components';

const Wrapper = styled.section`
  min-height: 100vh;

  .nav {
    align-items: center;
    justify-content: space-between;
  }

  .form {
    max-width: 400px;
    border-top: 5px solid var(--accent-primary);
  }

  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }

  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }

  .btn {
    margin-top: 1rem;
  }

  .member-btn {
    color: var(--accent-primary);
    margin-left: 0.25rem;
    text-transform: capitalize;
  }
`;

export default Wrapper;
