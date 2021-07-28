import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

test('Teste se No favorite pokemon found`, caso não tenha pokémons favoritos', () => {
  renderWithRouter(<FavoritePokemons />);
  const noFavPok = /No favorite pokemon found/i;
  expect(screen.getByText(noFavPok)).toBeDefined();
});
