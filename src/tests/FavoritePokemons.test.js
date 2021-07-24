import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente FavoritePokemons.js', () => {
  it('Testa se é exibida uma mensagem se não houver pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons />);

    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
