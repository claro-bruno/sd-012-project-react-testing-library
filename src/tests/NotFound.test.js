import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../rota/renderWithRoute';
import NotFound from '../components/NotFound';

describe('Testa NotFound.js', () => {
  it('Testa info de Not found(h2)', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(h2).toBeInTheDocument();
  });

  it('Testa imagem NotFound', () => {
    renderWithRouter(<NotFound />);
    const altText = screen
      .getByAltText(/pikachu crying because the page requested was not found/i);
    const img = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(altText).toBeInTheDocument();
    expect(altText.src).toBe(img);
  });
});
