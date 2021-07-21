import React from 'react';
import { render, screen } from '@testing-library/react';
// import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
// import App from '../App';

test('Testa se, quando nao ha pokemons favoritos, o texto eh exibido', () => {
  render(<FavoritePokemons />);
  const parag = screen.getByText('No favorite pokemon found');
  expect(parag).toBeDefined();
});
