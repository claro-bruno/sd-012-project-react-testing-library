import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const favoritePokemons = [
  {
    id: 143,
    name: 'Snorlax',
    type: 'Normal',
    averageWeight: {
      value: '460.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Vermillion City',
        map: 'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
      },
    ],
    summary: `What sounds like its cry may 
    actually be its snores or the rumblings of its hungry belly.`,
  },
  {
    id: 148,
    name: 'Dragonair',
    type: 'Dragon',
    averageWeight: {
      value: '16.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Johto Route 45',
        map: 'https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png',
      },
      {
        location: 'Johto Dragon\'s Den',
        map: 'https://cdn2.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png',
      },
    ],
    summary: `They say that if it emits an aura from
    its whole body, the weather will begin to change instantly.`,
  },
];

describe('Testa FavoritePokemons', () => {
  test('Testa FavoritePokemons sem nenhum pokmon favorito', () => {
    renderWithRouter(<FavoritePokemons />);
    const noPokemon = screen.getByText('No favorite pokemon found');
    expect(noPokemon).toBeInTheDocument();
  });

  test('Testa FavoritePokemons com dois pokemons favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);
    const snorlax = screen.getByText('Snorlax');
    const dragonair = screen.getByText('Dragonair');
    expect(snorlax).toBeInTheDocument();
    expect(dragonair).toBeInTheDocument();
  });
});
