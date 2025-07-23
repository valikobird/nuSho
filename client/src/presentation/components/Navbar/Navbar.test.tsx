import { beforeEach, describe, it, expect, vi } from 'vitest';
import { render } from '../../../test/utils';
import Navbar from './Navbar';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../Logo/Logo', () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('../ThemeToggle', () => ({
  default: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));

vi.mock('../LogoutContainer', () => ({
  default: ({ userName }: { userName: string }) => (
    <div data-testid="logout-container">LogoutContainer - {userName}</div>
  ),
}));

describe('Navbar', () => {
  const mockToggleSidebar = vi.fn();
  const userName = 'John Doe';

  beforeEach(() => {
    mockToggleSidebar.mockClear();
  });

  it('renders all main elements', () => {
    render(<Navbar toggleSidebar={mockToggleSidebar} userName={userName} />);

    expect(screen.getByRole('button', { name: '' })).toBeInTheDocument(); // Toggle button
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('userspace')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('logout-container')).toBeInTheDocument();
  });

  it('renders toggle sidebar button', () => {
    render(<Navbar toggleSidebar={mockToggleSidebar} userName={userName} />);

    const toggleButton = screen.getByRole('button', { name: '' });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveClass('toggle-btn');
  });

  it('calls toggleSidebar when toggle button is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar toggleSidebar={mockToggleSidebar} userName={userName} />);

    const toggleButton = screen.getByRole('button', { name: '' });
    await user.click(toggleButton);

    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
  });

  it('calls toggleSidebar multiple times on multiple clicks', async () => {
    const user = userEvent.setup();
    render(<Navbar toggleSidebar={mockToggleSidebar} userName={userName} />);

    const toggleButton = screen.getByRole('button', { name: '' });
    await user.click(toggleButton);
    await user.click(toggleButton);
    await user.click(toggleButton);

    expect(mockToggleSidebar).toHaveBeenCalledTimes(3);
  });

  it('renders logo section with correct text', () => {
    render(<Navbar toggleSidebar={mockToggleSidebar} userName={userName} />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('userspace')).toBeInTheDocument();

    const logoText = screen.getByText('userspace');
    expect(logoText).toHaveClass('logo-text');
    expect(logoText.tagName.toLowerCase()).toBe('h4');
  });

  it('passes userName to LogoutContainer', () => {
    render(<Navbar toggleSidebar={mockToggleSidebar} userName={userName} />);

    expect(screen.getByText(`LogoutContainer - ${userName}`)).toBeInTheDocument();
  });

  it('renders button container with correct components', () => {
    render(<Navbar toggleSidebar={mockToggleSidebar} userName={userName} />);

    const btnContainer = screen.getByTestId('theme-toggle').closest('.btn-container');
    expect(btnContainer).toBeInTheDocument();

    // Both ThemeToggle and LogoutContainer should be in the button container
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('logout-container')).toBeInTheDocument();
  });

  it('has correct CSS structure', () => {
    render(<Navbar toggleSidebar={mockToggleSidebar} userName={userName} />);

    const navCenter = screen.getByText('userspace').closest('.nav-center');
    expect(navCenter).toBeInTheDocument();

    const toggleButton = screen.getByRole('button', { name: '' });
    expect(toggleButton).toHaveClass('toggle-btn');

    const btnContainer = screen.getByTestId('theme-toggle').closest('.btn-container');
    expect(btnContainer).toHaveClass('btn-container');
  });

  it('renders toggle icon', () => {
    render(<Navbar toggleSidebar={mockToggleSidebar} userName={userName} />);

    const toggleButton = screen.getByRole('button', { name: '' });
    const icon = toggleButton.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
