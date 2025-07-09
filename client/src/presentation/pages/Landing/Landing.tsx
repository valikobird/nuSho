import Wrapper from './Wrapper';
import { Logo, ThemeToggle } from '../../components';
import { Link } from 'react-router-dom';
import main from '../../assets/images/main.svg';

const Landing = () => {
  return (
    <Wrapper>
      <nav className="nav">
        <Logo />
        <ThemeToggle />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>Home finances simplified</h1>
          <p>
            Tired of spending hours managing your finances?
            <br />
            Does even thinking about monthly budgeting give you a headache?
            <br />
            <span className="highlight">nuSho</span> makes home finances effortless.
            <br />
            Start spending just minutes and get a clear view of your financial situation.
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
