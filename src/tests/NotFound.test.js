import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWhithRouter from './renderWhithRouter.test';

describe('Testando componente NotFound', () => {
  beforeEach(() => {
    renderWhithRouter(<NotFound />);
  });

  test('Teste se pag contém um heading h2 com o texto Page requested not found', () => {
    const title = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(title).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem Pikachu not found', () => {
    const img = screen.getByRole('img',
      { name: /Pikachu crying because the page requested was not found/i });
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toBe(src);
  });
});
