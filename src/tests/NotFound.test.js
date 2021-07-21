import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa componente NotFound', () => {
  it(`Verifica se componente contém um heading h2 com o texto:
  "Page requested not found 😭"`, () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('img', {
      name: /Crying emoji/i })).toBeInTheDocument();
  });

  it('Verifica se componente mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const SRC_IMG = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    render(<NotFound />);
    expect(screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    })).toHaveAttribute('src', SRC_IMG);
  });
});
