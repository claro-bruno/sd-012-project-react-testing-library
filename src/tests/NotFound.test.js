import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente NotFound', () => {
  test('Teste se página contém um h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const titleH2 = screen.getByRole('heading', { level: 2 });
    expect(titleH2.innerHTML).toBe(
      'Page requested not found<span role="img" aria-label="Crying emoji"> 😭</span>',
    );
    expect(titleH2).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem do Pikachu chorando :(', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(img).toBeInTheDocument();
  });
});
