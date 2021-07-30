import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import renderWithRouter from './Helper/RendeWithRouter';

const mockFavPokemons = pokemons
  .filter((pokemon) => pokemon.name === 'Charmander' || pokemon.name === 'Pikachu');

describe('Testa componente FavoritePokemons', () => {
  test('Verifica a msg retornada quando não há nenhum Pokemon favotitado', () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
  test('Verifica se o componente renderiza os pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ mockFavPokemons } />);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
