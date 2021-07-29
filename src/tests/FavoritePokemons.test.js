import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente FavoritePokemon.js.', () => {
  it('Verifica se: aparece o texto "No favorite pokemon found",'
    + 'se a pessoa não possuir Pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons />);
    const getMessage = screen.getByText('No favorite pokemon found');
    expect(getMessage).toBeInTheDocument();
  });
});
