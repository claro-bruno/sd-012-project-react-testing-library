import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('testa o componente NotFound', () => {
  it('testa se h2 contém texto " Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const h2 = screen
      .getByRole('heading', { name: /Page requested not found/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });
  it('testa se página mosta imagem', () => {
    renderWithRouter(<NotFound />);

    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(img).toBeInTheDocument();
    expect(img.src).toBe(imgURL);
  });
});
