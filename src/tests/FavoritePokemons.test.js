import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';

describe('Requisito 3', () => {
  test('Testa se é exibido na tela o texto caso não tenha pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const withoutFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(withoutFavorite).toBeInTheDocument();
  });
});
