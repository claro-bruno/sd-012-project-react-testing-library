import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('testa se o notFound', () => {
  it('exibe msg especifica', () => {
    renderWithRouter(<NotFound />);
    const NotFoundfMsg = screen.getByRole('heading',
      { name: /Page requested not found Crying emoji/i });
    expect(NotFoundfMsg).toBeInTheDocument();
  });
  it('exibe imagem especifica', () => {
    renderWithRouter(<NotFound />);
    const pikachuCryImg = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(pikachuCryImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
