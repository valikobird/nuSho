import Wrapper from './Wrapper';
import { Form, useLoaderData } from 'react-router-dom';
import { FormRow, FormRowSelect, SubmitButton } from '../../components';

const AddAccount = () => {
  const { accountTypes, currencies } = useLoaderData();

  return (
    <Wrapper>
      <Form method="post" className="form form-accent">
        <h4>Add Account</h4>
        <FormRow type="text" name="name" />
        <FormRowSelect name="type" list={accountTypes} />
        <FormRowSelect name="currency" list={currencies} />
        <SubmitButton label="submit" />
      </Form>
    </Wrapper>
  );
};

export default AddAccount;
