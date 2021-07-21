import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <NotFound />', () => {
  it('Testa se o component possui um H2 com o texto "Page requested not found"',
    () => {
      renderWithRouter(<NotFound />);
      const h2 = screen.getByRole('heading',
        { name: /Page requested not found/i });

      expect(h2).toBeInTheDocument();
      expect(h2).toHaveTextContent('😭');
    });

  it('Testa se a página mostra uma imagem', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getAllByRole('img')[1];

    expect(img).toHaveProperty('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(img).toBeInTheDocument();
  });
});
