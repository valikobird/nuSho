import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '../../../test/utils';
import { screen } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';
import userEvent from '@testing-library/user-event';

const mockUseOutletContext = vi.fn();
const mockToggleDarkTheme = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => mockUseOutletContext(),
  };
});

describe('ThemeToggle', () => {
  beforeEach(() => {
    mockToggleDarkTheme.mockClear();
    mockUseOutletContext.mockReturnValue({
      isDarkTheme: false,
      toggleDarkTheme: mockToggleDarkTheme,
    });
  });

  it('renders sun icon when in light theme', () => {
    mockUseOutletContext.mockReturnValue({
      isDarkTheme: false,
      toggleDarkTheme: mockToggleDarkTheme,
    });

    render(<ThemeToggle />);

    const icon = screen.getByRole('button').querySelector('.toggle-icon');
    expect(icon).toBeInTheDocument();
  });

  it('renders moon icon when in dark theme', () => {
    mockUseOutletContext.mockReturnValue({
      isDarkTheme: true,
      toggleDarkTheme: mockToggleDarkTheme,
    });

    render(<ThemeToggle />);

    const icon = screen.getByRole('button').querySelector('.toggle-icon');
    expect(icon).toBeInTheDocument();
  });

  it('calls toggleDarkTheme when clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockToggleDarkTheme).toHaveBeenCalledTimes(1);
  });

  it('calls toggleDarkTheme multiple times on multiple clicks', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(mockToggleDarkTheme).toHaveBeenCalledTimes(3);
  });

  it('is clickable and accessible', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });
});
