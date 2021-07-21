import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('testa o componente FavoritePokemons.js', () => {
  it('testa se a tela exibe No favorite pokemon found, se nao tiver favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText(/No favorite pokemon found/i);
    expect(msg).toBeInTheDocument();
  });

  it('testa se é exibido todos os cards de pokémons favoritados', () => {
    // testa se é exibido todos os cards de pokémons favoritados
  });
});
