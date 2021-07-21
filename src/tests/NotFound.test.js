import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testes do componente NotFound', () => {
  test('Verifica se a página contém um h2 com o texto "Page requested not found"', () => {
    render(<NotFound />);
    const notFoundMSG = screen.getByText(/Page requested not found/i);
    const emoji = screen.getByText('😭');
    expect(notFoundMSG).toBeInTheDocument();
    expect(emoji).toBeInTheDocument();
  });

  test('Verifica se a página contém um gif', () => {
    render(<NotFound />);
    const imageLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getAllByRole('img');
    expect(img[1]).toHaveProperty('src', imageLink);
  });
});
