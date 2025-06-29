import styled from 'styled-components';

const Wrapper = styled.section`
  .account-card {
    border: 2px solid var(--border-light);
    border-radius: var(--border-radius);
    padding: 1rem;

    .account-type {
      text-transform: capitalize;
      line-height: 1.5;
    }
  }
`;

export default Wrapper;
