import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import mockFavoritePokemons from '../__mocks__/mockFavoritePokemons';

describe('Teste do componente <About />', () => {
  it(
    'Aparece na tela a mensagem "No favorite pokemon found" se não há pokémons favoritos',
    () => {
      renderWithRouter(<FavoritePokemons pokemons={ [] } />);
      const noFavPokeFound = screen.getByText(/no favorite pokemon found/i);

      expect(noFavPokeFound).toBeInTheDocument();
    },
  );

  it(
    'Aparece na tela a mensagem "No favorite pokemon found" se não há pokémons favoritos',
    () => {
      renderWithRouter(<FavoritePokemons pokemons={ mockFavoritePokemons } />);
      mockFavoritePokemons.forEach(({ name }) => {
        const pokemonName = screen.getByText(name);
        expect(pokemonName).toBeInTheDocument();
      });
    },
  );
});
