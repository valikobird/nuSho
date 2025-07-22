import { describe, expect, it } from 'vitest';
import { render } from '../../../test/utils';
import FormRow from './FormRow';
import { screen } from '@testing-library/react';

describe('FormRow', () => {
  it('renders with required props', () => {
    render(<FormRow type="text" name="username" />);

    const input = screen.getByRole('textbox');
    const label = screen.getByLabelText('username');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'username');
    expect(input).toHaveAttribute('id', 'username');
    expect(input).toBeRequired();
    expect(label).toBeInTheDocument();
  });

  it('renders with custom label text', () => {
    render(<FormRow type="email" name="email" labelText="Email Address" />);

    const label = screen.getByLabelText('Email Address');
    const input = screen.getByRole('textbox');

    expect(label).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'email');
  });

  it('renders with default value', () => {
    const defaultValue = 'john.doe@example.com';
    render(<FormRow type="email" name="email" defaultValue={defaultValue} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(defaultValue);
  });

  it('falls back to name as label text when labelText is not provided', () => {
    render(<FormRow type="text" name="firstName" />);

    const label = screen.getByLabelText('firstName');
    expect(label).toBeInTheDocument();
  });

  it('renders different input types correctly', () => {
    const { rerender } = render(<FormRow type="password" name="password" />);

    let input = screen.getByLabelText('password');
    expect(input).toHaveAttribute('type', 'password');

    rerender(<FormRow type="number" name="age" />);
    input = screen.getByRole('spinbutton'); // number inputs have spinbutton role
    expect(input).toHaveAttribute('type', 'number');
  });

  it('has correct CSS classes', () => {
    render(<FormRow type="text" name="test" />);

    const container = screen.getByLabelText('test').closest('.form-row');
    const label = screen.getByText('test');
    const input = screen.getByLabelText('test');

    expect(container).toHaveClass('form-row');
    expect(label).toHaveClass('form-label');
    expect(input).toHaveClass('form-input');
  });
});
