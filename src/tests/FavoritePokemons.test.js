import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import { mockPokemons } from '../helpers/mockPokemons';

describe('', () => {
  it('tests if there is some message with "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFoundMessage = screen.getByText('No favorite pokemon found');
    expect(notFoundMessage).toBeDefined();
  });

  it('tests if all favorite pokemons are rendered ', () => {
    renderWithRouter(<FavoritePokemons pokemons={ mockPokemons } />);
    mockPokemons.forEach((pokemon) => {
      const currentPokemon = screen.getByText(pokemon.name);
      expect(currentPokemon).toBeDefined();
    });
  });
});
