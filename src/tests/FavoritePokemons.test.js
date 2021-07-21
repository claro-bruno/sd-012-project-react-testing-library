import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testa o componente FavoritePokemons', () => {
  it('Testa se é exibida a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const notFoundText = screen.getByText('No favorite pokemon found');
    expect(notFoundText).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritos', () => {
    const pokemonsFavoritos = pokemons.map((pokemon) => pokemon);
    renderWithRouter(<FavoritePokemons pokemons={ pokemonsFavoritos } />);

    pokemonsFavoritos.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });
  });
});
