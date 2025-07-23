import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '../../../test/utils';
import NavLinks from './NavLinks';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('NavLinks', () => {
  const mockToggleSidebar = vi.fn();

  beforeEach(() => {
    mockToggleSidebar.mockClear();
  });

  it('renders all navigation links', () => {
    render(<NavLinks toggleSidebar={mockToggleSidebar} />);

    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /add account/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /admin/i })).toBeInTheDocument();
  });

  it('renders links with correct paths', () => {
    render(<NavLinks toggleSidebar={mockToggleSidebar} />);

    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /add account/i })).toHaveAttribute('href', '/add-account');
    expect(screen.getByRole('link', { name: /profile/i })).toHaveAttribute('href', '/profile');
    expect(screen.getByRole('link', { name: /admin/i })).toHaveAttribute('href', '/admin');
  });

  it('renders icons with text labels', () => {
    render(<NavLinks toggleSidebar={mockToggleSidebar} />);

    const links = screen.getAllByRole('link');

    links.forEach((link) => {
      const icon = link.querySelector('.icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toBeInstanceOf(HTMLSpanElement);
    });
  });

  it('does not call toggleSidebar on link click when not in sidebar popup', async () => {
    const user = userEvent.setup();
    render(<NavLinks toggleSidebar={mockToggleSidebar} isSidebarPopup={false} />);

    await user.click(screen.getByRole('link', { name: /dashboard/i }));

    expect(mockToggleSidebar).not.toHaveBeenCalled();
  });

  it('calls toggleSidebar on link click when in sidebar popup', async () => {
    const user = userEvent.setup();
    render(<NavLinks toggleSidebar={mockToggleSidebar} isSidebarPopup={true} />);

    await user.click(screen.getByRole('link', { name: /dashboard/i }));

    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
  });

  it('calls toggleSidebar for each link clicked in sidebar popup', async () => {
    const user = userEvent.setup();
    render(<NavLinks toggleSidebar={mockToggleSidebar} isSidebarPopup={true} />);

    await user.click(screen.getByRole('link', { name: /dashboard/i }));
    await user.click(screen.getByRole('link', { name: /profile/i }));

    expect(mockToggleSidebar).toHaveBeenCalledTimes(2);
  });

  it('has correct CSS classes', () => {
    render(<NavLinks toggleSidebar={mockToggleSidebar} />);

    const container = screen.getByRole('link', { name: /dashboard/i }).closest('.nav-links');
    expect(container).toHaveClass('nav-links');

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveClass('nav-link');
    });
  });
});
