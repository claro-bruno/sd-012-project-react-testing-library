import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

const { screen } = require('@testing-library/react');

describe('Testa o componente NotFound.js', () => {
  it('Testa se contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(heading).toBeInTheDocument();
  });
  it('Testa a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getAllByRole('img');
    expect(image[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
