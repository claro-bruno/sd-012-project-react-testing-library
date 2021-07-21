import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('testa o componente NotFound.js', () => {
  it('testa se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const title = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(title).toBeInTheDocument();
  });

  it('testa se a página contém uma imagem com link correto', () => {
    renderWithRouter(<NotFound />);
    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getAllByRole('img');
    expect(img[1]).toBeInTheDocument();
    expect(img[1]).toHaveAttribute('src', imgURL);
  });
});
