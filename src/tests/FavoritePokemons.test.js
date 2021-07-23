import { screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../helper/renderWithRouter';

describe('Component "Favorite Pokemons" test', () => {
  beforeEach(() => renderWithRouter(<FavoritePokemons />));

  it('Tests If doesn\'t has favorite pokemons, shows "No favorite pokemon found"', () => {
    const noFavoritePokemons = screen.getByText(/No favorite pokemon found/);

    expect(noFavoritePokemons).toBeInTheDocument();
  });

  it('Tests all favorite pokémons cards', () => {
  });
});
