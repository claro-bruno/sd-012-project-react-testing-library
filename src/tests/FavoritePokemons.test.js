import { screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../helper/renderWithRouter';

describe('Component "Favorite Pokemons" test', () => {
  it('Tests If doesn\'t has favorite pokemons, shows "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoritePokemons = screen.getByText(/No favorite pokemon found/);

    expect(noFavoritePokemons).toBeInTheDocument();
  });

  it('Tests all favorite pokémons cards', () => {
    const pokemon = [{
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
      summary: `This intelligent Pokémon roasts hard berries with 
      electricity to make them tender enough to eat.`,
    }];

    renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);

    const favoritePokemon = screen.getByTestId('pokemon-name');
    expect(favoritePokemon).toBeInTheDocument();
  });
});
