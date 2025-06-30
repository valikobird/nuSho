import { Form, Link } from 'react-router-dom';
import { FormRow, Logo, SubmitButton, ThemeToggle } from '../../components';
import Wrapper from './Wrapper';

const Register = () => {
  return (
    <Wrapper>
      <nav className="nav">
        <Logo />
        <ThemeToggle />
      </nav>
      <div className="form-page">
        <Form method="post" className="form form-accent">
          <h4>Register</h4>
          <FormRow type="text" name="name" defaultValue="valiko" labelText="Nickname" />
          <FormRow type="email" name="email" defaultValue="test@nusho.tut" />
          <FormRow type="password" name="password" defaultValue="secret123" />
          <SubmitButton label="submit" />
          <p>
            Already a member?
            <Link to="/login" className="member-btn">
              login
            </Link>
          </p>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Register;
