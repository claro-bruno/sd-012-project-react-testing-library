import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Teste todo o componente NotFound', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const correctMsg = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(correctMsg).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem do Pikachu chorando', () => {
    renderWithRouter(<NotFound />);
    const images = screen.getAllByRole('img');
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(images).toHaveLength(2);
    expect(images[1]).toBeInTheDocument();
    expect(images[1]).toHaveAttribute('src', url);
  });
});
