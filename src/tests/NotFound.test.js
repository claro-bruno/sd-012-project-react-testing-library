import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { NotFound } from '../components';

describe('Testa o componente NotFound', () => {
  it('Testa se a página contem o título Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(title).toBeInTheDocument();
  });

  it('Testa se a página mostra a imagem do Pikachu Tristão', () => {
    renderWithRouter(<NotFound />);
    const altText = /Pikachu crying because the page requested was not found/i;
    const image = screen.getByAltText(altText);
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
