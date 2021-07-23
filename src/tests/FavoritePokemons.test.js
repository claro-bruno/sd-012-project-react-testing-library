import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../rota/renderWithRoute';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa Favorite Pokemons.js', () => {
  it('Testa mensagem de Favorite', () => {
    renderWithRouter(<FavoritePokemons/>);
    const text = screen.getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });
})