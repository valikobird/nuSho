import { describe, expect, it } from 'vitest';
import { render } from '../../../test/utils';
import FormRowSelect from './FormRowSelect';
import { screen } from '@testing-library/react';

describe('FormRowSelect', () => {
  const mockOptions = [
    ['option1', 'Option One'],
    ['option2', 'Option Two'],
    ['option3', 'Option Three'],
  ];

  it('renders with required props', () => {
    render(<FormRowSelect name="status" list={mockOptions} />);

    const select = screen.getByRole('combobox');
    const label = screen.getByLabelText('status');

    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute('name', 'status');
    expect(select).toHaveAttribute('id', 'status');
    expect(label).toBeInTheDocument();
  });

  it('renders with custom label text', () => {
    render(<FormRowSelect name="status" labelText="Account Status" list={mockOptions} />);

    const label = screen.getByLabelText('Account Status');
    expect(label).toBeInTheDocument();
  });

  it('falls back to name as label text when labelText is not provided', () => {
    render(<FormRowSelect name="accountType" list={mockOptions} />);

    const label = screen.getByLabelText('accountType');
    expect(label).toBeInTheDocument();
  });

  it('renders all options correctly', () => {
    render(<FormRowSelect name="status" list={mockOptions} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveValue('option1');
    expect(options[0]).toHaveTextContent('Option One');
    expect(options[1]).toHaveValue('option2');
    expect(options[1]).toHaveTextContent('Option Two');
    expect(options[2]).toHaveValue('option3');
    expect(options[2]).toHaveTextContent('Option Three');
  });

  it('handles empty list gracefully', () => {
    render(<FormRowSelect name="status" list={[]} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    const options = screen.queryAllByRole('option');
    expect(options).toHaveLength(0);
  });

  it('handles undefined list gracefully', () => {
    render(<FormRowSelect name="status" list={undefined as unknown as string[][]} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    const options = screen.queryAllByRole('option');
    expect(options).toHaveLength(0);
  });

  it('has correct CSS classes', () => {
    render(<FormRowSelect name="status" list={mockOptions} />);

    const container = screen.getByLabelText('status').closest('.form-row');
    const label = screen.getByText('status');
    const select = screen.getByRole('combobox');

    expect(container).toHaveClass('form-row');
    expect(label).toHaveClass('form-label');
    expect(select).toHaveClass('form-select');
  });
});
