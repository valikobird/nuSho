import { describe, expect, it, vi } from 'vitest';
import { render } from '../../../test/utils';
import Logo from './Logo';
import { screen } from '@testing-library/react';

vi.mock('../../assets/images/logo.svg', () => ({
  default: 'mocked-logo.svg',
}));

describe('Logo', () => {
  it('renders logo image correctly', () => {
    render(<Logo />);

    const logoImage = screen.getByRole('img', { name: /logo/i });

    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('alt', 'logo');
    expect(logoImage).toHaveAttribute('src', 'mocked-logo.svg');
  });

  it('has correct CSS class', () => {
    render(<Logo />);

    const logoImage = screen.getByRole('img', { name: /logo/i });
    expect(logoImage).toHaveClass('logo');
  });
});
