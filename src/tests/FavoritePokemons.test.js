import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

const isPokemonFavoriteMock = {
  25: true,
  4: true,
};

describe('Testes para o componente Favorite Pokemons', () => {
  it('Verifica o texto se nao ha pokemons adicionado', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  it('Verifica se mostra todos os pokemons favoritados', () => {
    const favoritePokemons = pokemons.filter(({ id }) => isPokemonFavoriteMock[id]);
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);
    const pikachu = screen.getByText(/pikachu/i);
    const charmander = screen.getByText(/charmander/i);

    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
  });
});
