import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import {
  readFavoritePokemonIds,
  updateFavoritePokemons,
} from '../services/pokedexService';
import pokemons from '../data';

describe('Testes para o componente Favorite Pokemons', () => {
  it('Verifica o texto se nao ha pokemons adicionado', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  it('Verifica se mostra todos os pokemons favoritados', () => {
    const TWENTY_FIVE = 25;
    const FOUR = 4;
    updateFavoritePokemons(TWENTY_FIVE, true);
    updateFavoritePokemons(FOUR, true);
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    const favoritePokemons = pokemons.filter(({ id }) => isPokemonFavorite[id]);
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);
    const pikachu = screen.getByText(/pikachu/i);
    const charmander = screen.getByText(/charmander/i);

    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
    updateFavoritePokemons(TWENTY_FIVE, false);
    updateFavoritePokemons(FOUR, false);
  });
});
