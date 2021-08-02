import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa pagina NotFound', () => {
  it('Contem um heading h2 especifico', () => {
    const { history } = renderWithRouter(<App />);
    history.push('Greymon');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
  it('Verifica se existe imagem especificada', () => {
    renderWithRouter(<NotFound />);
    const imageGif = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imageGif.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(imageGif).toBeInTheDocument();
  });
});
