import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import mockFavs from '../../mocks/mockFavs';

// prettier-ignore
describe('Requisito 3', () => {
  it('3.1 - Teste se é exibido na tela a mensagem No favorite pokemon found.', () => {
    if (Storage.length === 0) {
      renderWithRouter(<FavoritePokemons />);
      const p = screen.getByText(/No favorite pokemon found/i);
      expect(p).toBeInTheDocument();
    }
  });
  it('3.2 - Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ mockFavs } />);
    mockFavs.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
    });
  });
});
