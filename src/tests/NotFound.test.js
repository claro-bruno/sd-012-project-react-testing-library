import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  beforeEach(() => render(<NotFound />));

  test('Teste se página contém um heading h2 com o texto "Page requested not found"',
    () => {
      const heading = screen.getByRole('heading', {
        name: /page requested not found crying emoji/i,
      });

      expect(heading).toBeInTheDocument();
    });

  test('Teste se página mostra a imagem', () => {
    const image = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(image).toBeInTheDocument();
  });
});
