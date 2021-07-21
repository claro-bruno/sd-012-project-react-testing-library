import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente NotFound', () => {
  test('Testa se existe um h2 com o texto "...not found"', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });

  test('Testa se renderiza imagem específica', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByAltText(/Pikachu/i)).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
