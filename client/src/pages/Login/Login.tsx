import Wrapper from './Wrapper';
import { FormRow, Logo, SubmitButton, ThemeToggle } from '../../components';
import { Form, Link } from 'react-router-dom';

const Login = () => {
  return (
    <Wrapper>
      <nav className="nav">
        <Logo />
        <ThemeToggle />
      </nav>
      <div className="form-page">
        <Form method="post" className="form form-accent">
          <h4>Login</h4>
          <FormRow type="email" name="email" defaultValue="test@nusho.tut" />
          <FormRow type="password" name="password" defaultValue="secret123" />
          <SubmitButton label="submit" />
          <button type="button" className="btn btn-block">
            explore the app
          </button>
          <p>
            Not a member yet?
            <Link to="/register" className="member-btn">
              register
            </Link>
          </p>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Login;
