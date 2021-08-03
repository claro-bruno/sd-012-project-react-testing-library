import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  test('Verifica se é renderizado um texto', () => {
    renderWithRouter(<NotFound />);
    const text = screen.getByText('Page requested not found');
    expect(text).toBeInTheDocument();
  });

  test('Verifica se é renderizada a imagem', () => {
    renderWithRouter(<NotFound />);

    const error = 'Pikachu crying because the page requested was not found';
    const imageLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByAltText(error);

    expect(image).toHaveAttribute('src', imageLink);
  });
});
