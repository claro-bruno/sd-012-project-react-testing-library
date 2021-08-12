import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente NotFound.js', () => {
  test('Testa se a página contém um h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByText(/Page requested not found/i);
    expect(h2).toBeDefined();
  });
  test('Testa se a página mostra a imagem do pikachu trsite', () => {
    renderWithRouter(<NotFound />);
    const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(screen.getAllByRole('img')[1]).toHaveProperty('src', imageUrl);
    expect(screen.getAllByRole('img')[1]).toHaveClass('not-found-image');
  });
});
