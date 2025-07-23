import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '../../../test/utils';
import SubmitButton from './SubmitButton';
import { screen } from '@testing-library/react';

const mockUseNavigation = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigation: () => mockUseNavigation(),
  };
});

describe('SubmitButton', () => {
  beforeEach(() => {
    mockUseNavigation.mockReturnValue({ state: 'idle' });
  });

  it('renders with provided label when not submitting', () => {
    render(<SubmitButton label="Create Account" />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Create Account');
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('shows submitting text and disables button when submitting', () => {
    mockUseNavigation.mockReturnValue({ state: 'submitting' });

    render(<SubmitButton label="Create Account" />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('submitting...');
    expect(button).toBeDisabled();
  });

  it('has correct CSS classes', () => {
    render(<SubmitButton label="Submit" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn', 'btn-block');
  });

  it('handles different navigation states correctly', () => {
    const { rerender } = render(<SubmitButton label="Save" />);

    // Idle state
    let button = screen.getByRole('button');
    expect(button).toHaveTextContent('Save');
    expect(button).not.toBeDisabled();

    // Loading state
    mockUseNavigation.mockReturnValue({ state: 'loading' });
    rerender(<SubmitButton label="Save" />);
    button = screen.getByRole('button');
    expect(button).toHaveTextContent('Save');
    expect(button).not.toBeDisabled();

    // Submitting state
    mockUseNavigation.mockReturnValue({ state: 'submitting' });
    rerender(<SubmitButton label="Save" />);
    button = screen.getByRole('button');
    expect(button).toHaveTextContent('submitting...');
    expect(button).toBeDisabled();
  });
});
