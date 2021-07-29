import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { FavoritePokemons } from '../components';

const favPokemonsMock = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  },
  {
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: {
      value: '2.9',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
  },
];

describe('Testa o component FavoritePokemons', () => {
  it('Testa a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText(/No favorite pokemon found/i);

    expect(msg).toBeInTheDocument();
  });

  it('Testa pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favPokemonsMock } />);
    const pikachuImg = screen.getByRole('img', { name: /pikachu sprite/i });
    const caterpieImg = screen.getByRole('img', { name: /caterpie sprite/i });

    expect(pikachuImg).toBeInTheDocument();
    expect(caterpieImg).toBeInTheDocument();
  });
});
