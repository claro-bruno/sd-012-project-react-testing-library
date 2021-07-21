import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

const pikachuSummary1 = 'This intelligent Pokémon roasts hard berries';
const pikachuSummary2 = 'with electricity to make them tender enough to eat.';
const pikachuSummary = `${pikachuSummary1} ${pikachuSummary2}`;
const charmanderSummary1 = 'The flame on its tail shows the strength of its life force.';
const charmanderSummary2 = 'If it is weak, the flame also burns weakly.';
const charmanderSummary = `${charmanderSummary1} ${charmanderSummary2}`;

const favPokemon = [
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
    summary: pikachuSummary,
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary: charmanderSummary,
  },
];

describe('Testa FavoritePokemons', () => {
  test('Testa quando não há preferidos', () => {
    renderWithRouter(<FavoritePokemons />);
    const noPokemonFound = screen.getByText('No favorite pokemon found');
    expect(noPokemonFound).toBeInTheDocument();
  });
  test('Testa com um favorito', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favPokemon } />);
    const pikachu = screen.getByText('Pikachu');
    const charmander = screen.getByText('Charmander');
    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
  });
});
