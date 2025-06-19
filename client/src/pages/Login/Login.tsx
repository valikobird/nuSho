import Wrapper from './Wrapper';
import { FormRow, Logo, ThemeToggle } from '../../components';
import { Form, Link, useNavigation } from 'react-router-dom';

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <nav className="nav">
        <ThemeToggle />
      </nav>
      <div className="form-page">
        <Form method="post" className="form">
          <Logo />
          <h4>Login</h4>
          <FormRow type="email" name="email" defaultValue="text@nusho.tut" />
          <FormRow type="password" name="password" defaultValue="secret123" />
          <button
            type="submit"
            className="btn btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
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
