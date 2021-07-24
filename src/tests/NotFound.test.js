import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('4 - Testa o componente <NotFound.js />', () => {
  it('Verifica se página contém um heading h2 com o texto'
      + ' Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole('heading', { name: /Page requested not found/i, level: 2 });
    const emoji = screen.getByRole('img', { name: 'Crying emoji' });
    expect(notFound).toBeInTheDocument();
    expect(emoji).toBeInTheDocument();
  });

  it('Verifica se se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageNotFound = screen.getAllByRole('img');
    expect(imageNotFound[1]).toHaveAttribute('src', imgSrc);
  });
});
