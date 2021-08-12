import React from 'react';

import { screen } from '@testing-library/react';

import renderWithRouter from './helper';

import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa componente FavoritePokemons', () => {
  it('Shouldnt render favortire pokemons', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');
    const favPokemons = screen.getByText('No favorite pokemon found');
    expect(favPokemons).toBeInTheDocument();
  });
});
