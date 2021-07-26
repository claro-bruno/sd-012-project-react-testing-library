import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  renderWithRouter(<FavoritePokemons />);
});

describe('Testando o componente FavoritePokemons.js', () => {
  test('Verifica a mensagem No favorite pokemon found, sem pokémons favoritos ', () => {
    const pokemonMsg = screen.getByText('No favorite pokemon found');
    expect(pokemonMsg).toBeInTheDocument();
  });
});
