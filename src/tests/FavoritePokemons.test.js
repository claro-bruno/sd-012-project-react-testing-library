// requisito 3
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const mockFavPokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  },
  {
    id: 151,
    name: 'Mew',
    type: 'Psychic',
    averageWeight: {
      value: '4.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
  },
];

describe('FavoritePokemons tests:', () => {
  test('When favorites pokemons = 0 shows message: "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavPokemonsMsg = screen.getByText(/No favorite pokemon found/i);

    expect(noFavPokemonsMsg).toBeInTheDocument();
  });

  test('When pokemons are favorites', () => {
    renderWithRouter(<FavoritePokemons pokemons={ mockFavPokemons } />);

    const pikachuImg = screen.getByRole('img', { name: /pikachu sprite/i });
    const mewImg = screen.getByRole('img', { name: /mew sprite/i });

    expect(pikachuImg).toBeInTheDocument();
    expect(mewImg).toBeInTheDocument();
  });
});
