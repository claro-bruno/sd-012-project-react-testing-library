import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente <NotFound />', () => {
  it('Testa se a página possui um heading ', () => {
    renderWithRouter(<NotFound />);

    const h2 = screen.getByText('Page requested not found');
    expect(h2).toBeInTheDocument();
  });

  it('Testa se mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const img = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
