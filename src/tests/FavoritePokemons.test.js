import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
// import App from '../App';
import renderRouter from '../utils';

describe('Testes do componente FavoritePokemon.js', () => {
  it('', () => {
    renderRouter(<FavoritePokemons pokemons={ [] } />);
  });
})