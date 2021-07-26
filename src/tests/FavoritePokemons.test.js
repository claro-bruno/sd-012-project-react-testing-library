import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Verifica o componente "FavoritePokemons.js"', () => {
  test('Verifica se a mensagem "No favorite pokemin found" exibe na tela', () => {
    renderWithRouter(<FavoritePokemons />);
    const foundText = screen.getByText(/No Favorite Pokemon Found/i);
    expect(foundText).toBeInTheDocument();
  });
});
