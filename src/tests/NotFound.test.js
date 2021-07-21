import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testa componente NotFound', () => {
  it('Testa se página contém heading h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const h2Text = screen.getByRole('heading', { level: 2 });
    expect(h2Text).toBeInTheDocument();
    expect(h2Text).toHaveTextContent('Page requested not found');
  });

  it('Testa se a página renderiza imagem de erro', () => {
    renderWithRouter(<NotFound />);
    const img = screen
      .getByAltText(/pikachu crying because the page requested was not found/i);

    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
