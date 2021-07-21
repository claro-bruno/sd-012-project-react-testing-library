import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente FavoritePokemons.js', () => {
  it('Testa a renderização sem pokemons favoritados', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole('heading', { name: /Page requested not found/i });
    const image = screen.getByAltText(/Pikachu crying/i);
    const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(notFound).toBeDefined();
    expect(image).toHaveProperty('src', imageUrl);
  });
});
