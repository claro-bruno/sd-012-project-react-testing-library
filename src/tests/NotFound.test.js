import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Testes do componente NotFound', () => {
  it('Testa se página contém um heading h2 com o texto "Page requested not found 😭"',
    () => {
      renderWithRouter(<NotFound />);
      const heading = screen.getByRole('heading', { level: 2 }).innerHTML;

      expect(heading).toMatch(/Page requested not found/);
    });

  it('Teste se página mostra uma imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getAllByRole('img');
    const { src } = image[1];

    expect(src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
