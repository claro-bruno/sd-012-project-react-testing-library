import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa todo FavoritePokemons.js', () => {
  it('renderiza "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const noFavoriteFound = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoriteFound).toBeVisible();
  });
});
