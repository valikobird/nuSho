import { Link, useRouteError, type ErrorResponse } from 'react-router-dom';
import Wrapper from './Wrapper';
import img from '../../assets/images/not-found.svg';

const Error = () => {
  const error: ErrorResponse = useRouteError() as ErrorResponse;

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh! page not found</h3>
          <p>we can't seem to find the page you are looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>something went wrong</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
