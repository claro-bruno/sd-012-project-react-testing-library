import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('testa pag not found', () => {
  it('texto pag not found', () => {
    renderWithRouter(<NotFound />);
    const texto = screen.getByText('Page requested not found');
    expect(texto).toBeInTheDocument();
  });
  it('testa imagem', () => {
    renderWithRouter(<NotFound />);
    const alt = 'Pikachu crying because the page requested was not found';
    const
      imagem = screen.getByAltText(alt);
    expect(imagem).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
