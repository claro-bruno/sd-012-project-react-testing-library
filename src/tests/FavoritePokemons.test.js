import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Favorite Pokemons', () => {
  it('Shows "No favorite pokemon found" if favorite Pokemon list is empty', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});
