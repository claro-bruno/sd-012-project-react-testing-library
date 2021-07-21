import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Verifica NotFound.js', () => {
  it('Testa se página contém um heading.', () => {
    render(<NotFound />);
    const title = screen.getByRole(
      'heading', { name: 'Page requested not found Crying emoji' },
    );
    expect(title).toBeInTheDocument();
  });

  it('Testa se página mostra a imagem.', () => {
    render(<NotFound />);
    const imagem = screen.getByRole(
      'img', { name: /Pikachu crying because the page requested was not found/i },
    );
    expect(imagem.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
