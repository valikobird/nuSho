import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '../../../test/utils';
import SidebarPopup from './SidebarPopup';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../Logo/Logo', () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('../NavLinks', () => ({
  default: ({ toggleSidebar }: { toggleSidebar: () => void }) => (
    <div data-testid="nav-links" onClick={toggleSidebar}>
      NavLinks
    </div>
  ),
}));

describe('SidebarPopup', () => {
  const mockToggleSidebar = vi.fn();

  beforeEach(() => {
    mockToggleSidebar.mockClear();
  });

  it('renders logo and nav links', () => {
    render(<SidebarPopup showSidebar={true} toggleSidebar={mockToggleSidebar} />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('nav-links')).toBeInTheDocument();
  });

  it('shows close button', () => {
    render(<SidebarPopup showSidebar={true} toggleSidebar={mockToggleSidebar} />);
    const closeButton = screen.getByRole('button', { name: '' });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass('close-btn');
  });

  it('calls toggleSidebar when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<SidebarPopup showSidebar={true} toggleSidebar={mockToggleSidebar} />);

    const closeButton = screen.getByRole('button', { name: '' });
    await user.click(closeButton);
    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
  });

  it('renders logo in header section', () => {
    render(<SidebarPopup showSidebar={true} toggleSidebar={mockToggleSidebar} />);

    const logo = screen.getByTestId('logo');
    const header = logo.closest('header');
    expect(header).toBeInTheDocument();
  });

  it('applies correct CSS class when showSidebar is false', () => {
    render(<SidebarPopup showSidebar={false} toggleSidebar={mockToggleSidebar} />);

    const sidebarContainer = screen.getByTestId('logo').closest('.sidebar-container');
    expect(sidebarContainer).toHaveClass('sidebar-container');
    expect(sidebarContainer).not.toHaveClass('show-sidebar');
  });

  it('applies correct CSS class when showSidebar is true', () => {
    render(<SidebarPopup showSidebar={true} toggleSidebar={mockToggleSidebar} />);

    const sidebarContainer = screen.getByTestId('logo').closest('.sidebar-container');
    expect(sidebarContainer).toHaveClass('sidebar-container');
    expect(sidebarContainer).toHaveClass('show-sidebar');
  });

  it('passes toggleSidebar to NavLinks', () => {
    render(<SidebarPopup showSidebar={true} toggleSidebar={mockToggleSidebar} />);

    const navLinks = screen.getByTestId('nav-links');
    expect(navLinks).toBeInTheDocument();
  });

  it('has correct content structure', () => {
    render(<SidebarPopup showSidebar={true} toggleSidebar={mockToggleSidebar} />);

    const content = screen.getByTestId('logo').closest('.content');
    expect(content).toBeInTheDocument();

    // Both header and nav-links should be inside content
    expect(content?.querySelector('header')).toBeInTheDocument();
    expect(content?.contains(screen.getByTestId('nav-links'))).toBe(true);
  });

  it('sidebar visibility logic works correctly', () => {
    const { rerender } = render(<SidebarPopup showSidebar={true} toggleSidebar={mockToggleSidebar} />);

    let sidebarContainer = screen.getByTestId('logo').closest('.sidebar-container');
    expect(sidebarContainer).toHaveClass('show-sidebar');

    rerender(<SidebarPopup showSidebar={false} toggleSidebar={mockToggleSidebar} />);
    sidebarContainer = screen.getByTestId('logo').closest('.sidebar-container');
    expect(sidebarContainer).not.toHaveClass('show-sidebar');
  });
});
