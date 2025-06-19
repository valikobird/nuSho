import { Link } from 'react-router-dom';
import { FormRow, Logo, ThemeToggle } from '../../components';
import Wrapper from './Wrapper';

const Register = () => {
  return (
    <Wrapper>
      <nav className="nav">
        <ThemeToggle />
      </nav>
      <div className="form-page">
        <form className="form">
          <Logo />
          <h4>Register</h4>
          <FormRow
            type="text"
            name="name"
            defaultValue="valiko"
            labelText="Nickname"
          />
          <FormRow type="email" name="email" defaultValue="test@nusho.tut" />
          <FormRow type="password" name="password" defaultValue="secret123" />
          <button type="submit" className="btn btn-block">
            submit
          </button>
          <p>
            Already a member?
            <Link to="/login" className="member-btn">
              login
            </Link>
          </p>
        </form>
      </div>
    </Wrapper>
  );
};

export default Register;
