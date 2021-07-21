import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('testa componente notFound', () => {
  it('testa renderização de notFound', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading',
      {
        level: 2,
        name: /Page requested not found/i,
      });
    expect(heading).toBeInTheDocument();

    const img = screen.getByRole('img',
      {
        name: /Pikachu crying because the page requested was not found/i,
      });

    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
