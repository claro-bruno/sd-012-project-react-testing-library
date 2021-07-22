import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica FavoritePokemons.js', () => {
  test(
    'Testa se é exibido na tela uma mensagem se a pessoa não tiver pokémons favoritos',
    () => {
      const { history } = renderWithRouter(<App />);
      const favorite = screen.getByText(/favorite/i);

      userEvent.click(favorite);

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
      const msgFavorite = 'No favorite pokemon found';
      expect(screen.getByText(msgFavorite)).toBeInTheDocument();
    },
  );

  test(
    'Testa se é exibido todos os cards de pokémons favoritados',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByText(/More details/i);
      userEvent.click(moreDetails);

      const favoritarPokemon = screen.getByRole('checkbox');
      userEvent.click(favoritarPokemon);

      const favorite = screen.getByText(/favorite/i);
      userEvent.click(favorite);

      const pokemonsFavoritados = screen.getAllByTestId('pokemon-name');
      expect(pokemonsFavoritados.length).toBe(1);
    },
  );
});
