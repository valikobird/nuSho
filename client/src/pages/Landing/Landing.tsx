import Wrapper from './Wrapper';
import { Logo } from '../../components';
import { Link } from 'react-router-dom';
import main from '../../assets/images/main.svg';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>Home finances made simple</h1>
          <p>
            Are you tired of hours spent on keeping your finances organized?
            <br />
            Do you feel pain even just thinking about monthly підбивання
            рахунків?
            <br />
            You are in the right place to start spending minutes and still have
            clear overview of you financial situation.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="finances simple" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
