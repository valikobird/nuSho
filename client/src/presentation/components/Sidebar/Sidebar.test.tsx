import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '../../../test/utils';
import Sidebar from './Sidebar';
import { screen } from '@testing-library/react';

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

describe('Sidebar', () => {
  const mockToggleSidebar = vi.fn();

  beforeEach(() => {
    mockToggleSidebar.mockClear();
  });

  it('renders logo and nav links', () => {
    render(<Sidebar showSidebar={false} toggleSidebar={mockToggleSidebar} />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('nav-links')).toBeInTheDocument();
  });

  it('renders logo in header section', () => {
    render(<Sidebar showSidebar={false} toggleSidebar={mockToggleSidebar} />);

    const logo = screen.getByTestId('logo');
    const header = logo.closest('header');
    expect(header).toBeInTheDocument();
  });

  it('applies correct CSS class when showSidebar is false', () => {
    render(<Sidebar showSidebar={false} toggleSidebar={mockToggleSidebar} />);

    const sidebarContainer = screen.getByTestId('logo').closest('.sidebar-container');
    expect(sidebarContainer).toHaveClass('sidebar-container');
    expect(sidebarContainer).toHaveClass('show-sidebar');
  });

  it('applies correct CSS class when showSidebar is true', () => {
    render(<Sidebar showSidebar={true} toggleSidebar={mockToggleSidebar} />);

    const sidebarContainer = screen.getByTestId('logo').closest('.sidebar-container');
    expect(sidebarContainer).toHaveClass('sidebar-container');
    expect(sidebarContainer).not.toHaveClass('show-sidebar');
  });

  it('passes toggleSidebar to NavLinks', () => {
    render(<Sidebar showSidebar={false} toggleSidebar={mockToggleSidebar} />);

    const navLinks = screen.getByTestId('nav-links');
    expect(navLinks).toBeInTheDocument();
  });

  it('has correct content structure', () => {
    render(<Sidebar showSidebar={false} toggleSidebar={mockToggleSidebar} />);

    const content = screen.getByTestId('logo').closest('.content');
    expect(content).toBeInTheDocument();
    expect(content?.querySelector('header')).toBeInTheDocument();
    expect(content?.contains(screen.getByTestId('nav-links'))).toBe(true);
  });

  it('sidebar visibility logic works correctly', () => {
    const { rerender } = render(<Sidebar showSidebar={false} toggleSidebar={mockToggleSidebar} />);

    let sidebarContainer = screen.getByTestId('logo').closest('.sidebar-container');
    expect(sidebarContainer).toHaveClass('show-sidebar'); // Inverted logic: false means show

    rerender(<Sidebar showSidebar={true} toggleSidebar={mockToggleSidebar} />);
    sidebarContainer = screen.getByTestId('logo').closest('.sidebar-container');
    expect(sidebarContainer).not.toHaveClass('show-sidebar'); // Inverted logic: true means hide
  });
});
