import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import favoritePokemons from '../__mocks__/mockFavoritePokemons';

describe('3 - Test component <FavoritePokemons.js />', () => {
  it('3.1 - Test if show a message when there is no favorite pokémons', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoriteMessage = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoriteMessage).toBeDefined();
  });

  // A lógica do código abaixo foi extraída do código do colega Thalles Carneiro.

  // Considerei utilizar este código por ter uma lógica simples, e um código limpo usando mock e forEach.

  // Fonte: https://github.com/tryber/sd-012-project-react-testing-library/pull/18/commits/3f68cb4738377fe8eb10e65743317a46821923be

  it('3.2 - Render favorite pokémons', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);
    favoritePokemons.forEach(({ name }) => {
      const favoritePokemonName = screen.getByText(name);
      expect(favoritePokemonName).toBeInTheDocument();
    });
  });
});
