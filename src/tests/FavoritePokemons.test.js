import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente FavoritePokemons.js', () => {
  it('Testa a renderização sem pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(screen.getByText('No favorite pokemon found')).toBeDefined();
  });

  it('Testa a renderização sem pokemons favoritados', () => {
    const pokemonTest = {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    };
    renderWithRouter(<FavoritePokemons pokemons={ [pokemonTest] } />);
    expect(screen.getByRole('heading', { name: 'Favorite pokémons' }));
  });
});
