import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { NotFound } from '../components';

describe('Testa component NotFound', () => {
  it('Testa se o h2 é renderizado', () => {
    renderWithRouter(<NotFound />);
    const subtitulo = screen.getByRole('heading', {
      name: /page requested not found crying emoji/i,
    });

    expect(subtitulo).toBeInTheDocument();
    expect(subtitulo).toHaveTextContent(/page requested not found/i);
  });

  it('Testa se img tem URL específica', () => {
    renderWithRouter(<NotFound />);
    const img = screen
      .getByAltText(/pikachu crying because the page requested was not found/i);

    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
