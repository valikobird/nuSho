import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { render } from '../../../test/utils.tsx';
import userEvent from '@testing-library/user-event';
import LogoutContainer from './LogoutContainer';

const mockNavigate = vi.fn();
const mockLogout = vi.fn();
const mockUseUserUseCases = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../hooks/containerHooks', () => ({
  useUserUseCases: () => mockUseUserUseCases(),
}));

describe('LogoutContainer', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockLogout.mockClear();
    mockUseUserUseCases.mockReturnValue({
      logout: mockLogout,
    });
  });

  it('renders user button with username', () => {
    render(<LogoutContainer userName="John Doe" />);

    const userButton = screen.getByRole('button', { name: /john doe/i });
    expect(userButton).toBeInTheDocument();
    expect(userButton).toHaveClass('user-btn');
  });

  it('renders user icon and caret icon', () => {
    render(<LogoutContainer userName="John Doe" />);

    const userButton = screen.getByRole('button', { name: /john doe/i });
    expect(userButton).toBeInTheDocument();

    const icons = userButton.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('initially hides the dropdown menu', () => {
    render(<LogoutContainer userName="John Doe" />);

    const dropdown = screen.getByText('logout').closest('.dropdown');
    expect(dropdown).not.toHaveClass('show-dropdown');
  });

  it('shows dropdown when user button is clicked', async () => {
    const user = userEvent.setup();
    render(<LogoutContainer userName="John Doe" />);

    const userButton = screen.getByRole('button', { name: /john doe/i });
    await user.click(userButton);

    const dropdown = screen.getByText('logout').closest('.dropdown');
    expect(dropdown).toHaveClass('show-dropdown');
  });

  it('toggles dropdown visibility on multiple clicks', async () => {
    const user = userEvent.setup();
    render(<LogoutContainer userName="John Doe" />);

    const userButton = screen.getByRole('button', { name: /john doe/i });
    const dropdown = screen.getByText('logout').closest('.dropdown');

    // Initially hidden
    expect(dropdown).not.toHaveClass('show-dropdown');

    // Show on first click
    await user.click(userButton);
    expect(dropdown).toHaveClass('show-dropdown');

    // Hide on second click
    await user.click(userButton);
    expect(dropdown).not.toHaveClass('show-dropdown');
  });

  it('calls logout and navigates on logout button click', async () => {
    const user = userEvent.setup();
    mockLogout.mockResolvedValue(undefined);

    render(<LogoutContainer userName="John Doe" />);

    // Open dropdown first
    const userButton = screen.getByRole('button', { name: /john doe/i });
    await user.click(userButton);

    // Click logout button
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    await user.click(logoutButton);

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('navigates to home on logout failure', async () => {
    const user = userEvent.setup();
    mockLogout.mockRejectedValue(new Error('Logout failed'));

    render(<LogoutContainer userName="John Doe" />);

    // Open dropdown first
    const userButton = screen.getByRole('button', { name: /john doe/i });
    await user.click(userButton);

    // Click logout button
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    await user.click(logoutButton);

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('renders logout button in dropdown', async () => {
    const user = userEvent.setup();
    render(<LogoutContainer userName="John Doe" />);

    // Open dropdown
    const userButton = screen.getByRole('button', { name: /john doe/i });
    await user.click(userButton);

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveClass('dropdown-btn');
  });

  it('has correct CSS classes', () => {
    render(<LogoutContainer userName="John Doe" />);

    const userButton = screen.getByRole('button', { name: /john doe/i });
    const dropdown = screen.getByText('logout').closest('.dropdown');

    expect(userButton).toHaveClass('btn', 'user-btn');
    expect(dropdown).toHaveClass('dropdown');
  });
});
