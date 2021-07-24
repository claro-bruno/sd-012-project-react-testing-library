import React from 'react';
import { screen } from '@testing-library/react';
import renderWRouter from './RenderWRouter';
import NotFound from '../components/NotFound';

describe('Verifica o component NotFound', () => {
  test('Verifica se mostra o texto "Page requested not found"', () => {
    renderWRouter(<NotFound />);
    const notFoundMsg = screen.getByText(/Page requested not found/i);

    expect(notFoundMsg).toBeInTheDocument();
  });
  test('Verifica se a gif do pikachu triste aparece em notfound', () => {
    renderWRouter(<NotFound />);
    const gifSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const pikachuGif = screen.getByRole('img', { name: /Pikachu/i });

    expect(pikachuGif).toHaveAttribute('src', gifSrc);
  });
});
