import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <NotFound />', () => {
  it('Teste se página contém um texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading',
      { name: /Page requested not found/i });

    expect(h2).toBeInTheDocument();
  });

  it('Testa se a página mostra uma imagem', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getAllByRole('img')[1];

    expect(img).toHaveProperty('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(img).toBeInTheDocument();
  });
});
