import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

import pokemons from '../data';

const favPokemonsMock = pokemons
  .filter(({ name }) => name === 'Pikachu' || name === 'Caterpie');

describe('FavoritePokemons tests', () => {
  it('The "No favorite pokemon found" message must be in the document', () => {
    renderWithRouter(<FavoritePokemons />);
    const noPokemonsMsg = screen.getByText(/No favorite pokemon found/i);

    expect(noPokemonsMsg).toBeInTheDocument(); // 100% mutants;
  });

  it('When pokemons are favorites', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favPokemonsMock } />);

    const pikachuImg = screen.getByRole('img', { name: /pikachu sprite/i });
    const caterpieImg = screen.getByRole('img', { name: /caterpie sprite/i });

    expect(pikachuImg).toBeInTheDocument();
    expect(caterpieImg).toBeInTheDocument();
  });
});
