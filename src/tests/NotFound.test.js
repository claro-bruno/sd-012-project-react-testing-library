import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o component NotFound', () => {
  test('Testa se exibe um "h2" com o texto "Page requested not found"', () => {
    render(<NotFound />);
    const h2 = screen.getByText(/Page requested not found/i);
    expect(h2).toBeDefined();
  });
  test('Testa se exibe a imagem do pikachu chorando', () => {
    render(<NotFound />);
    const img = screen.getByRole('img',
      { name: /Pikachu crying because the page requested was not found/i });
    expect(img).toBeDefined();
    const imgSRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toBe(imgSRC);
  });
});
