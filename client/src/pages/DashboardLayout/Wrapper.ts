import styled from 'styled-components';

const Wrapper = styled.section`
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }

  @media (min-width: 992px) {
    .dashboard-page {
      width: 90%;
    }
  }
`;

export default Wrapper;
