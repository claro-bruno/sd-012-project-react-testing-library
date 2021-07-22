import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

const pokemonSample = [
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
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'Text about it',
  },
];

const quantityOfPokemons = pokemonSample.length;

describe('Check if FavoritePokemons.js is working as it should', () => {
  afterEach(cleanup);

  it('Check if the text "No favorite pokemon found" exist when empty', () => {
    renderWithRouter(<FavoritePokemons />);
    // const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    // expect(favoritePokemons).toBeInTheDocument();
    // waitFor(() => userEvent.click(favoritePokemons));
    const title = screen.getByText(/Favorite Pokémons/i);
    const text = screen.getByText(/No favorite pokemon found/i);
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
  it('Check if all pokemon cards are displayed', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemonSample } />);
    const allImg = screen.getAllByRole('img');
    const sprites = allImg.filter((img) => img.alt.includes('sprite'));
    expect(sprites.length).toBe(quantityOfPokemons);
  });
});
