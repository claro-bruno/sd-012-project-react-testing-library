import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  test('Teste se página contém um heading com texto Page requested not found 😭', () => {
    const titulo = screen.getByRole(
      'heading',
      {
        name: /page requested not found/i,
      },
    );
    expect(titulo).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getAllByRole('img');
    expect(img[1].src).toBe(imgSrc);
  });
});
