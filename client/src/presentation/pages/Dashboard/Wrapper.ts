import styled from 'styled-components';

const Wrapper = styled.section`
  .accounts-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }

  .account-card {
    border: 2px solid var(--border-light);
    border-radius: var(--border-radius);
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr auto;

    .account-type {
      text-transform: capitalize;
      line-height: 1.5;
    }
  }

  .actions {
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
`;

export default Wrapper;
