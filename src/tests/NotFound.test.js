import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa página NotFound', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it('Testa se tem o título na página', () => {
    const titulo = screen.getByRole('heading',
      { name: /page requested not found/i, level: 2 });
    expect(titulo).toBeInTheDocument();
  });

  const FTINHA = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  it('Testa se tem a imagem bem lindona lá', () => {
    const imagem = screen.getByRole('img',
      { name: /Pikachu crying because the page requested was not found/i });
    expect(imagem).toHaveAttribute('src', FTINHA);
  });
});
