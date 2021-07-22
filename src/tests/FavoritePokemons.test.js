import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa FavoritePokemons', () => {
  it('Existe mensagem "No favorite pokemon found", em caso de não favoritados',
    () => {
      renderWithRouter(<App />);
      const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
      userEvent.click(favoritePokemons);

      const paragraphOne = 'No favorite pokemon found';
      const paragraphOneTest = screen.getByText(paragraphOne);

      expect(paragraphOneTest).toBeDefined();
    });

  it('Verifica se os pokemons favoritados são renderizados', async () => {
    const { history } = renderWithRouter(<App />);

    pokemons.forEach(async (pokemon) => {
      const { id, name } = pokemon;

      history.push(`/pokemons/${id}`);

      const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
      userEvent.click(favoritePokemons);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');

      const pokemonName = await screen.findAllText(name);
      expect(pokemonName).toBeDefined();
    });
  });
});

// const FavoritePokemon = screen.getByLabelText('Pokémon favoritado?');
// expect(FavoritePokemon).toBeDefined();
