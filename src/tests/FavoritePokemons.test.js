import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import TestPokemons from './TestPokemons';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente FavoritePokemon.js', () => {
  it('Checa a msg "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const withoutPoke = screen.getByText('No favorite pokemon found');

    expect(withoutPoke).toBeInTheDocument();
  });

  it('Checa se os cards favoritados são exibidos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ TestPokemons } />);
    TestPokemons.forEach(({ name }) => {
      const pokeName = screen.getByText(name);

      expect(pokeName).toBeInTheDocument();
    });
  });
});
