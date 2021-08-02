import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Requisito 3 - Teste o componente <FavoritePokemons.js />', () => {
  it('1.Teste se é exibido No favorite pokemon found, caso não haja pokémons favoritados',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const msg = screen.getByText(/No favorite pokemon found/);

      expect(msg).toBeInTheDocument();
    });

  // Peguei a idéia do colega Thalles para fazer o forEach, source: https://github.com/tryber/sd-012-project-react-testing-library/pull/18/files
  it('2.Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    pokemons.forEach(({ name }) => {
      const pokemonName = screen.getByText(name);
      expect(pokemonName).toBeInTheDocument();
    });
  });
});
