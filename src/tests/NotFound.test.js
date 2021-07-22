import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound tests', () => {
  it('Screen must have a specific "h2"', () => {
    renderWithRouter(<NotFound />);
    const subtitle = screen.getByRole('heading', {
      name: /page requested not found crying emoji/i,
    });
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent(/page requested not found/i);
  });

  it('Screen must have a image with a specific url', () => {
    renderWithRouter(<NotFound />);
    const img = screen
      .getByAltText(/pikachu crying because the page requested was not found/i);

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'); // 100% mutants;
  });
});
