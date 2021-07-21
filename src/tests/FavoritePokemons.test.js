import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('Se é exibido na tela a mensagem no faovrite pokemon found', () => {
  renderWithRouter(<FavoritePokemons />);
  const pageTextWithoutFav = screen.getByText('No favorite pokemon found');
  expect(pageTextWithoutFav).toBeInTheDocument();
});

test('Se é exibida a tela com o pokémon favoritado', () => {
  renderWithRouter(<App />);
  const pokeType = screen.getByText('Normal');
  userEvent.click(pokeType);
  const details = screen.getByText('More details');
  userEvent.click(details);
  const checkFavorite = screen.getByRole('checkbox');
  userEvent.click(checkFavorite);
  const favoriteName = screen.getByText('Snorlax');
  expect(favoriteName).toBeInTheDocument();
});
